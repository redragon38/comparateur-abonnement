from fastapi import FastAPI, APIRouter
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
import zipfile
import io


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Review Models
class Review(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    appId: str
    userName: str
    rating: int = Field(ge=1, le=5)  # Entre 1 et 5
    comment: str
    date: str
    helpful: int = Field(default=0)
    userInitials: str

class ReviewCreate(BaseModel):
    appId: str
    userName: str
    rating: int = Field(ge=1, le=5)
    comment: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Reviews endpoints
@api_router.get("/reviews/{app_id}", response_model=List[Review])
async def get_reviews(app_id: str):
    """Récupérer tous les avis pour une application/abonnement"""
    try:
        reviews = await db.reviews.find({"appId": app_id}).sort("date", -1).to_list(1000)
        return [Review(**review) for review in reviews]
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des avis: {e}")
        return []

@api_router.post("/reviews", response_model=Review)
async def create_review(review_input: ReviewCreate):
    """Créer un nouvel avis"""
    try:
        # Créer les initiales
        user_initials = ''.join([n[0] for n in review_input.userName.strip().split()]).upper()[:2]
        
        # Créer l'objet Review
        review = Review(
            appId=review_input.appId,
            userName=review_input.userName.strip(),
            rating=review_input.rating,
            comment=review_input.comment.strip(),
            date=datetime.now().strftime('%d/%m/%Y'),
            helpful=0,
            userInitials=user_initials
        )
        
        # Insérer dans MongoDB
        await db.reviews.insert_one(review.dict())
        
        logger.info(f"Avis créé: {review.id} pour {review.appId}")
        return review
    except Exception as e:
        logger.error(f"Erreur lors de la création de l'avis: {e}")
        raise

@api_router.put("/reviews/{app_id}/{review_id}/helpful")
async def increment_helpful(app_id: str, review_id: str):
    """Incrémenter le compteur 'Utile' d'un avis"""
    try:
        result = await db.reviews.update_one(
            {"id": review_id, "appId": app_id},
            {"$inc": {"helpful": 1}}
        )
        
        if result.modified_count > 0:
            logger.info(f"Vote utile ajouté pour l'avis {review_id}")
            return {"success": True, "message": "Vote ajouté"}
        else:
            logger.warning(f"Avis non trouvé: {review_id}")
            return {"success": False, "message": "Avis non trouvé"}
    except Exception as e:
        logger.error(f"Erreur lors du vote: {e}")
        raise

# Download project endpoint
@api_router.get("/download-project")
async def download_project():
    """Télécharger TOUT le projet en ZIP"""
    try:
        # Créer un buffer en mémoire
        zip_buffer = io.BytesIO()
        
        project_root = Path("/app")
        
        # Dossiers/fichiers à EXCLURE (volumineux ou inutiles)
        exclude_dirs = {'node_modules', '__pycache__', '.git', '.emergent', 'build', 'dist', '.venv', 'test_reports', '.cache', '.npm', '.yarn'}
        exclude_extensions = {'.pyc', '.pyo', '.log', '.tmp', '.lock'}
        exclude_files = {'project.zip', 'yarn.lock', 'package-lock.json', 'bun.lockb'}
        
        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            # Parcourir TOUT le projet
            for file_path in project_root.rglob('*'):
                if file_path.is_file():
                    # Vérifier les exclusions de dossiers
                    if any(part in exclude_dirs for part in file_path.parts):
                        continue
                    # Vérifier les exclusions d'extensions
                    if file_path.suffix in exclude_extensions:
                        continue
                    # Vérifier les exclusions de fichiers spécifiques
                    if file_path.name in exclude_files:
                        continue
                    
                    # Chemin relatif dans le ZIP
                    arcname = str(file_path.relative_to(project_root))
                    zip_file.write(file_path, arcname)
                    
            logger.info(f"Fichiers ajoutés au ZIP: {len(zip_file.namelist())}")
        
        # Remettre le curseur au début
        zip_buffer.seek(0)
        
        logger.info("Projet ZIP complet généré avec succès")
        
        return StreamingResponse(
            zip_buffer,
            media_type="application/zip",
            headers={
                "Content-Disposition": "attachment; filename=combien-ca-coute-project.zip"
            }
        )
    except Exception as e:
        logger.error(f"Erreur lors de la génération du ZIP: {e}")
        raise

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

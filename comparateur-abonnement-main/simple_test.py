#!/usr/bin/env python3
"""
Simple verification test for Reviews API endpoints
"""

import requests
import json

# Backend URL from frontend/.env
BACKEND_URL = "https://web-enhancer-31.preview.emergentagent.com/api"

def test_basic_functionality():
    """Test basic API functionality"""
    print("🚀 Testing Reviews API Basic Functionality")
    print(f"Backend URL: {BACKEND_URL}")
    print("=" * 50)
    
    # Test 1: GET reviews for a new app (should work)
    print("\n1. Testing GET /api/reviews/test-app")
    try:
        response = requests.get(f"{BACKEND_URL}/reviews/test-app")
        if response.status_code == 200:
            reviews = response.json()
            print(f"✅ GET request successful - Retrieved {len(reviews)} reviews")
        else:
            print(f"❌ GET request failed - HTTP {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ GET request failed - {str(e)}")
        return False
    
    # Test 2: POST new review
    print("\n2. Testing POST /api/reviews")
    try:
        review_data = {
            "appId": "test-app",
            "userName": "Test User",
            "rating": 5,
            "comment": "Test comment for API verification"
        }
        
        response = requests.post(
            f"{BACKEND_URL}/reviews",
            json=review_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            review = response.json()
            print(f"✅ POST request successful - Created review with ID: {review.get('id')}")
            
            # Verify required fields
            required_fields = ["id", "appId", "userName", "rating", "comment", "date", "helpful", "userInitials"]
            missing_fields = [field for field in required_fields if field not in review]
            
            if not missing_fields:
                print(f"✅ All required fields present: {', '.join(required_fields)}")
                review_id = review["id"]
            else:
                print(f"❌ Missing fields: {missing_fields}")
                return False
        else:
            print(f"❌ POST request failed - HTTP {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print(f"❌ POST request failed - {str(e)}")
        return False
    
    # Test 3: PUT helpful vote
    print("\n3. Testing PUT /api/reviews/test-app/{review_id}/helpful")
    try:
        response = requests.put(f"{BACKEND_URL}/reviews/test-app/{review_id}/helpful")
        
        if response.status_code == 200:
            result = response.json()
            if result.get("success") == True:
                print(f"✅ PUT request successful - {result.get('message')}")
            else:
                print(f"❌ PUT request failed - {result.get('message')}")
                return False
        else:
            print(f"❌ PUT request failed - HTTP {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print(f"❌ PUT request failed - {str(e)}")
        return False
    
    # Test 4: Verify helpful count was incremented
    print("\n4. Verifying helpful count increment")
    try:
        response = requests.get(f"{BACKEND_URL}/reviews/test-app")
        if response.status_code == 200:
            reviews = response.json()
            updated_review = next((r for r in reviews if r["id"] == review_id), None)
            
            if updated_review and updated_review["helpful"] >= 1:
                print(f"✅ Helpful count verified - Count: {updated_review['helpful']}")
            else:
                print(f"❌ Helpful count not incremented properly")
                return False
        else:
            print(f"❌ Verification failed - HTTP {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Verification failed - {str(e)}")
        return False
    
    print("\n" + "=" * 50)
    print("🎉 All basic functionality tests passed!")
    print("✅ Reviews API is working correctly")
    return True

if __name__ == "__main__":
    success = test_basic_functionality()
    exit(0 if success else 1)
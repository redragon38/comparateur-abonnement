#!/usr/bin/env python3
"""
Test script for Reviews API endpoints
Tests the migration from JSONBin to MongoDB for the subscription comparison app
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from frontend/.env
BACKEND_URL = "https://budget-buddy-4785.preview.emergentagent.com/api"

class ReviewsAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.test_results = []
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details:
            print(f"   Details: {details}")
        
        self.test_results.append({
            "test": test_name,
            "success": success,
            "message": message,
            "details": details
        })
    
    def test_get_reviews_empty(self, app_id):
        """Test getting reviews for an app (should be empty initially)"""
        try:
            response = requests.get(f"{self.base_url}/reviews/{app_id}")
            
            if response.status_code == 200:
                reviews = response.json()
                if isinstance(reviews, list):
                    self.log_test(
                        f"GET /reviews/{app_id} (empty)",
                        True,
                        f"Successfully retrieved reviews list (count: {len(reviews)})",
                        f"Response: {reviews}"
                    )
                    return reviews
                else:
                    self.log_test(
                        f"GET /reviews/{app_id} (empty)",
                        False,
                        "Response is not a list",
                        f"Response: {reviews}"
                    )
                    return None
            else:
                self.log_test(
                    f"GET /reviews/{app_id} (empty)",
                    False,
                    f"HTTP {response.status_code}",
                    f"Response: {response.text}"
                )
                return None
                
        except Exception as e:
            self.log_test(
                f"GET /reviews/{app_id} (empty)",
                False,
                f"Request failed: {str(e)}"
            )
            return None
    
    def test_create_review(self, app_id, user_name, rating, comment):
        """Test creating a new review"""
        try:
            review_data = {
                "appId": app_id,
                "userName": user_name,
                "rating": rating,
                "comment": comment
            }
            
            response = requests.post(
                f"{self.base_url}/reviews",
                json=review_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                review = response.json()
                
                # Verify required fields
                required_fields = ["id", "appId", "userName", "rating", "comment", "date", "helpful", "userInitials"]
                missing_fields = [field for field in required_fields if field not in review]
                
                if not missing_fields:
                    # Verify data integrity
                    checks = [
                        review["appId"] == app_id,
                        review["userName"] == user_name,
                        review["rating"] == rating,
                        review["comment"] == comment,
                        review["helpful"] == 0,
                        len(review["userInitials"]) <= 2,
                        review["id"] is not None
                    ]
                    
                    if all(checks):
                        self.log_test(
                            f"POST /reviews ({user_name})",
                            True,
                            f"Review created successfully with ID: {review['id']}",
                            f"Review: {review}"
                        )
                        return review
                    else:
                        self.log_test(
                            f"POST /reviews ({user_name})",
                            False,
                            "Data integrity check failed",
                            f"Review: {review}"
                        )
                        return None
                else:
                    self.log_test(
                        f"POST /reviews ({user_name})",
                        False,
                        f"Missing required fields: {missing_fields}",
                        f"Review: {review}"
                    )
                    return None
            else:
                self.log_test(
                    f"POST /reviews ({user_name})",
                    False,
                    f"HTTP {response.status_code}",
                    f"Response: {response.text}"
                )
                return None
                
        except Exception as e:
            self.log_test(
                f"POST /reviews ({user_name})",
                False,
                f"Request failed: {str(e)}"
            )
            return None
    
    def test_get_reviews_with_data(self, app_id, expected_count=None):
        """Test getting reviews after creating some"""
        try:
            response = requests.get(f"{self.base_url}/reviews/{app_id}")
            
            if response.status_code == 200:
                reviews = response.json()
                
                if isinstance(reviews, list):
                    success = True
                    message = f"Retrieved {len(reviews)} reviews"
                    
                    if expected_count is not None and len(reviews) != expected_count:
                        success = False
                        message = f"Expected {expected_count} reviews, got {len(reviews)}"
                    
                    self.log_test(
                        f"GET /reviews/{app_id} (with data)",
                        success,
                        message,
                        f"Reviews: {reviews}"
                    )
                    return reviews
                else:
                    self.log_test(
                        f"GET /reviews/{app_id} (with data)",
                        False,
                        "Response is not a list",
                        f"Response: {reviews}"
                    )
                    return None
            else:
                self.log_test(
                    f"GET /reviews/{app_id} (with data)",
                    False,
                    f"HTTP {response.status_code}",
                    f"Response: {response.text}"
                )
                return None
                
        except Exception as e:
            self.log_test(
                f"GET /reviews/{app_id} (with data)",
                False,
                f"Request failed: {str(e)}"
            )
            return None
    
    def test_vote_helpful(self, app_id, review_id):
        """Test voting helpful on a review"""
        try:
            response = requests.put(f"{self.base_url}/reviews/{app_id}/{review_id}/helpful")
            
            if response.status_code == 200:
                result = response.json()
                
                if result.get("success") == True:
                    self.log_test(
                        f"PUT /reviews/{app_id}/{review_id}/helpful",
                        True,
                        "Helpful vote added successfully",
                        f"Response: {result}"
                    )
                    return True
                else:
                    self.log_test(
                        f"PUT /reviews/{app_id}/{review_id}/helpful",
                        False,
                        f"Vote failed: {result.get('message', 'Unknown error')}",
                        f"Response: {result}"
                    )
                    return False
            else:
                self.log_test(
                    f"PUT /reviews/{app_id}/{review_id}/helpful",
                    False,
                    f"HTTP {response.status_code}",
                    f"Response: {response.text}"
                )
                return False
                
        except Exception as e:
            self.log_test(
                f"PUT /reviews/{app_id}/{review_id}/helpful",
                False,
                f"Request failed: {str(e)}"
            )
            return False
    
    def test_data_isolation(self, app1, app2):
        """Test that reviews are isolated by appId"""
        try:
            # Get reviews for both apps
            reviews1 = self.test_get_reviews_with_data(app1)
            reviews2 = self.test_get_reviews_with_data(app2)
            
            if reviews1 is not None and reviews2 is not None:
                # Check that reviews are properly isolated
                app1_reviews_in_app2 = [r for r in reviews2 if r.get("appId") == app1]
                app2_reviews_in_app1 = [r for r in reviews1 if r.get("appId") == app2]
                
                if len(app1_reviews_in_app2) == 0 and len(app2_reviews_in_app1) == 0:
                    self.log_test(
                        f"Data isolation ({app1} vs {app2})",
                        True,
                        "Reviews are properly isolated by appId",
                        f"{app1}: {len(reviews1)} reviews, {app2}: {len(reviews2)} reviews"
                    )
                    return True
                else:
                    self.log_test(
                        f"Data isolation ({app1} vs {app2})",
                        False,
                        "Reviews are not properly isolated",
                        f"Cross-contamination detected"
                    )
                    return False
            else:
                self.log_test(
                    f"Data isolation ({app1} vs {app2})",
                    False,
                    "Could not retrieve reviews for comparison"
                )
                return False
                
        except Exception as e:
            self.log_test(
                f"Data isolation ({app1} vs {app2})",
                False,
                f"Test failed: {str(e)}"
            )
            return False
    
    def run_complete_test_scenario(self):
        """Run the complete test scenario as requested"""
        print(f"🚀 Starting Reviews API Testing")
        print(f"Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Test data
        netflix_reviews = [
            {"userName": "Marie Dubois", "rating": 5, "comment": "Excellent service de streaming! Beaucoup de contenu de qualité."},
            {"userName": "Pierre Martin", "rating": 4, "comment": "Très bon catalogue, mais parfois des problèmes de connexion."},
            {"userName": "Sophie Laurent", "rating": 3, "comment": "Correct mais un peu cher pour ce que c'est."}
        ]
        
        spotify_reviews = [
            {"userName": "Thomas Petit", "rating": 5, "comment": "La meilleure plateforme de musique! Interface intuitive."},
            {"userName": "Julie Moreau", "rating": 4, "comment": "Très bonne qualité audio, recommandations pertinentes."}
        ]
        
        # 1. Test initial state (should be empty)
        print("\n📋 Phase 1: Testing initial state")
        initial_netflix_reviews = self.test_get_reviews_empty("netflix")
        initial_spotify_reviews = self.test_get_reviews_empty("spotify")
        
        # 2. Create reviews for Netflix
        print("\n📝 Phase 2: Creating Netflix reviews")
        created_netflix_reviews = []
        for review_data in netflix_reviews:
            review = self.test_create_review("netflix", review_data["userName"], review_data["rating"], review_data["comment"])
            if review:
                created_netflix_reviews.append(review)
        
        # 3. Create reviews for Spotify
        print("\n📝 Phase 3: Creating Spotify reviews")
        created_spotify_reviews = []
        for review_data in spotify_reviews:
            review = self.test_create_review("spotify", review_data["userName"], review_data["rating"], review_data["comment"])
            if review:
                created_spotify_reviews.append(review)
        
        # 4. Verify reviews were created
        print("\n📊 Phase 4: Verifying created reviews")
        netflix_reviews_after = self.test_get_reviews_with_data("netflix", len(created_netflix_reviews))
        spotify_reviews_after = self.test_get_reviews_with_data("spotify", len(created_spotify_reviews))
        
        # 5. Test helpful voting
        print("\n👍 Phase 5: Testing helpful voting")
        if created_netflix_reviews:
            first_review = created_netflix_reviews[0]
            vote_success = self.test_vote_helpful("netflix", first_review["id"])
            
            if vote_success:
                # Verify the helpful count was incremented
                updated_reviews = self.test_get_reviews_with_data("netflix")
                if updated_reviews:
                    updated_review = next((r for r in updated_reviews if r["id"] == first_review["id"]), None)
                    if updated_review and updated_review["helpful"] == 1:
                        self.log_test(
                            "Helpful counter verification",
                            True,
                            f"Helpful count incremented to {updated_review['helpful']}",
                            f"Review ID: {first_review['id']}"
                        )
                    else:
                        self.log_test(
                            "Helpful counter verification",
                            False,
                            "Helpful count was not incremented properly",
                            f"Expected: 1, Got: {updated_review['helpful'] if updated_review else 'Review not found'}"
                        )
        
        # 6. Test data isolation
        print("\n🔒 Phase 6: Testing data isolation")
        self.test_data_isolation("netflix", "spotify")
        
        # 7. Test with Disney Plus (should be empty)
        print("\n🏰 Phase 7: Testing Disney Plus (should be empty)")
        disney_reviews = self.test_get_reviews_empty("disney-plus")
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed_tests = sum(1 for result in self.test_results if result["success"])
        total_tests = len(self.test_results)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {total_tests - passed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        # List failed tests
        failed_tests = [result for result in self.test_results if not result["success"]]
        if failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in failed_tests:
                print(f"  - {test['test']}: {test['message']}")
        
        return passed_tests == total_tests

if __name__ == "__main__":
    tester = ReviewsAPITester()
    success = tester.run_complete_test_scenario()
    
    if success:
        print("\n🎉 All tests passed! Reviews API is working correctly.")
        sys.exit(0)
    else:
        print("\n💥 Some tests failed. Please check the issues above.")
        sys.exit(1)
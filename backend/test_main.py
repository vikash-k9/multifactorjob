from fastapi.testclient import TestClient
from .main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Job Matching Engine API is running"}

def test_match_perfect():
    payload = {
        "candidate": {
            "skills": ["Python", "FastAPI"],
            "experience_years": 5,
            "preferred_locations": ["Remote"],
            "preferred_roles": ["Backend Engineer"],
            "expected_salary": 100000,
            "education": {"degree": "BS", "field": "CS", "cgpa": 3.0}
        },
        "jobs": [
            {
                "job_id": "J1",
                "title": "Backend Engineer",
                "required_skills": ["Python", "FastAPI"],
                "experience_required": "2-6 years",
                "location": "Remote",
                "salary_range": [100000, 150000],
                "company": "Test Co"
            }
        ]
    }
    response = client.post("/match", json=payload)
    assert response.status_code == 200
    data = response.json()
    match = data["matches"][0]
    assert match["match_score"] == 100.0
    assert match["breakdown"]["skill_match"] == 100.0

def test_match_partial():
    # Only skill matches (Python). Loc, Role, Salary mismatch.
    payload = {
        "candidate": {
            "skills": ["Python"],
            "experience_years": 1,
            "preferred_locations": ["NY"],
            "preferred_roles": ["Data Scientist"],
            "expected_salary": 200000,
            "education": {"degree": "BS", "field": "CS", "cgpa": 3.0}
        },
        "jobs": [
            {
                "job_id": "J2",
                "title": "Backend Dev",
                "required_skills": ["Python", "Java"], # 50% skills
                "experience_required": "0-2 years", # Match (15%)
                "location": "SF", # Mismatch
                "salary_range": [100000, 150000], # Mismatch salary (expected 200k) -> 150/200 = 75%
                "company": "Test Co"
            }
        ]
    }
    # Logic:
    # Skill: 50% * 0.4 = 20
    # Loc: 0
    # Salary: (150/200)*100 = 75 * 0.15 = 11.25
    # Exp: Match (100) * 0.15 = 15
    # Role: 0
    # Total: 20 + 0 + 11.25 + 15 + 0 = 46.25
    
    response = client.post("/match", json=payload)
    assert response.status_code == 200
    data = response.json()
    match = data["matches"][0]
    # Allow some float tolerance
    assert abs(match["match_score"] - 46.3) < 0.2  # 46.25 rounded to 46.3
    

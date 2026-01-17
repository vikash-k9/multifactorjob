from pydantic import BaseModel, Field
from typing import List, Optional

class Education(BaseModel):
    degree: str
    field: str
    cgpa: float

class CandidateProfile(BaseModel):
    skills: List[str]
    experience_years: int
    preferred_locations: List[str]
    preferred_roles: List[str]
    expected_salary: int
    education: Education

class JobPosting(BaseModel):
    job_id: str
    title: str
    required_skills: List[str]
    experience_required: str  # Format: "min-max years" e.g., "0-2 years"
    location: str
    salary_range: List[int]  # [min, max]
    company: str

class MatchBreakdown(BaseModel):
    skill_match: float
    location_match: float
    salary_match: float
    experience_match: float
    role_match: float

class JobMatch(BaseModel):
    job_id: str
    match_score: float
    breakdown: MatchBreakdown
    missing_skills: List[str]
    recommendation_reason: str

class MatchRequest(BaseModel):
    candidate: CandidateProfile
    jobs: List[JobPosting]

class MatchResponse(BaseModel):
    matches: List[JobMatch]

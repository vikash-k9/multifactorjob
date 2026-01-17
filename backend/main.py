from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import MatchRequest, MatchResponse, JobMatch
from .scoring import calculate_score

app = FastAPI(title="Job Matching Engine")

# CORS middleware to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all. In prod, strict list.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Job Matching Engine API is running"}

@app.post("/match", response_model=MatchResponse)
def match_jobs(request: MatchRequest):
    try:
        candidate = request.candidate
        jobs = request.jobs
        
        results = []
        for job in jobs:
            score, breakdown, missing = calculate_score(candidate, job)
            results.append(JobMatch(
                job_id=job.job_id,
                match_score=score,
                breakdown=breakdown,
                missing_skills=missing,
                recommendation_reason=f"Match Score: {score}%" # Simple reason for now
            ))
            
        # Rank by score descending
        results.sort(key=lambda x: x.match_score, reverse=True)
        
        return MatchResponse(matches=results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

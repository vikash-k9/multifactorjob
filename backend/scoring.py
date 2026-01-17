from .models import CandidateProfile, JobPosting, MatchBreakdown
import re

def parse_experience_range(exp_str: str):
    """Parses experience string like '0-2 years' into (min, max)."""
    try:
        # Extract numbers using regex
        nums = [float(x) for x in re.findall(r"[\d\.]+", exp_str)]
        if not nums:
            return 0, 0
        if len(nums) == 1:
            return nums[0], nums[0]
        return nums[0], nums[1]
    except:
        return 0, 0

def calculate_score(candidate: CandidateProfile, job: JobPosting) -> tuple[float, MatchBreakdown, list[str]]:
    # 1. Skill Match (40%)
    job_skills_lower = {s.lower() for s in job.required_skills}
    cand_skills_lower = {s.lower() for s in candidate.skills}
    
    if not job_skills_lower:
        skill_score = 100.0
        missing_skills = []
    else:
        matching_skills = job_skills_lower.intersection(cand_skills_lower)
        skill_score = (len(matching_skills) / len(job_skills_lower)) * 100
        missing_skills = [s for s in job.required_skills if s.lower() not in cand_skills_lower]

    # 2. Location Match (20%)
    loc_score = 0.0
    if any(loc.lower() in job.location.lower() for loc in candidate.preferred_locations):
         loc_score = 100.0
    elif any(job.location.lower() in loc.lower() for loc in candidate.preferred_locations):
         loc_score = 100.0
    
    # 3. Salary Match (15%)
    # If job max salary >= expected match is 100. Else proportional.
    salary_score = 0.0
    job_max = job.salary_range[1] if len(job.salary_range) > 1 else job.salary_range[0]
    if job_max >= candidate.expected_salary:
        salary_score = 100.0
    else:
        if candidate.expected_salary > 0:
            salary_score = (job_max / candidate.expected_salary) * 100
        else:
            salary_score = 100.0 # No expectation
            
    # 4. Experience Match (15%)
    exp_score = 0.0
    min_exp, max_exp = parse_experience_range(job.experience_required)
    if candidate.experience_years >= min_exp: # Assuming if more than min, it's good. 
        # Optionally penalize if too senior? Usually no for this simple task.
        exp_score = 100.0
    else:
        # Maybe partial credit? Let's stay binary for simplicity unless 'Match' implies closeness.
        exp_score = 0.0

    # 5. Role Match (10%)
    role_score = 0.0
    job_title_lower = job.title.lower()
    if any(role.lower() in job_title_lower or job_title_lower in role.lower() for role in candidate.preferred_roles):
        role_score = 100.0

    # Weighted Total
    total_score = (
        (skill_score * 0.40) +
        (loc_score * 0.20) +
        (salary_score * 0.15) +
        (exp_score * 0.15) +
        (role_score * 0.10)
    )

    breakdown = MatchBreakdown(
        skill_match=round(skill_score, 1),
        location_match=round(loc_score, 1),
        salary_match=round(salary_score, 1),
        experience_match=round(exp_score, 1),
        role_match=round(role_score, 1)
    )

    return round(total_score, 1), breakdown, missing_skills

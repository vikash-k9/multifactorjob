# Multi-Factor Job Matching Engine

A full-stack application that matches candidates to job postings using a sophisticated weighted scoring algorithm. Built with **FastAPI** for the backend and **React** (Vite) for the frontend, featuring a premium glassmorphism UI.

## 🚀 Features

*   **Multi-Factor Scoring**: Evaluates matches based on:
    *   **Skills (40%)**: Overlap between candidate skills and job requirements.
    *   **Location (20%)**: Matches preferred locations against job location.
    *   **Salary (15%)**: Compatibility of expected vs. offered salary.
    *   **Experience (15%)**: Checks if candidate meets the required experience range.
    *   **Role (10%)**: Matches preferred roles with job titles.
*   **Ranking**: Returns matched jobs sorted by highest compatibility score.
*   **Instant Feedback**: Detailed breakdown of why a job was matched (or why the score is low).
*   **Premium UI**: Custom Vanilla CSS design with animations and glassmorphism effects.

## 🛠️ Tech Stack

*   **Backend**: Python, FastAPI, Pydantic, Pytest
*   **Frontend**: React, Vite, Vanilla CSS
*   **Testing**: Pytest (Backend Logic)

## 📦 Installation & Setup

### Prerequisites
*   Node.js & npm
*   Python 3.8+

### 1. Backend Setup

```bash
# Navigate to the project root
cd backend

# Create a virtual environment (optional but recommended)
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```

The Backend API will be available at: `http://localhost:8000`  
Interactive Docs: `http://localhost:8000/docs`

### 2. Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

The Frontend will be available at: `http://localhost:5173`

## 🧪 Running Tests

To verify the matching algorithm:

```bash
# From the project root
python -m pytest backend/
```

## 📝 API Endpoints

### `POST /match`
Matches a candidate profile against a list of jobs.

**Request Body:**
```json
{
  "candidate": { ... },
  "jobs": [ ... ]
}
```

**Response:**
```json
{
  "matches": [
    {
      "job_id": "J001",
      "match_score": 85.5,
      "breakdown": { ... }
    }
  ]
}
```

## 📄 License
This project is open source.

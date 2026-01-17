import React, { useState } from 'react';
import CandidateForm from './components/CandidateForm';
import ResultsList from './components/ResultsList';
import './index.css';

const MOCK_JOBS = [
  {
    job_id: "J001",
    title: "Senior Backend Developer",
    required_skills: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    experience_required: "3-6 years",
    location: "Bangalore",
    salary_range: [2000000, 3500000],
    company: "TechCorp"
  },
  {
    job_id: "J002",
    title: "Frontend Engineer",
    required_skills: ["React", "JavaScript", "CSS"],
    experience_required: "1-3 years",
    location: "Hyderabad",
    salary_range: [800000, 1500000],
    company: "WebSolutions"
  },
  {
    job_id: "J003",
    title: "Full Stack Developer",
    required_skills: ["Python", "React", "AWS"],
    experience_required: "2-5 years",
    location: "Remote",
    salary_range: [1500000, 2500000],
    company: "StartupX"
  },
  {
    job_id: "J004",
    title: "Data Scientist",
    required_skills: ["Python", "Machine Learning", "SQL"],
    experience_required: "2-5 years",
    location: "Bangalore",
    salary_range: [1800000, 3000000],
    company: "DataAI"
  }
];

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMatch = async (candidateProfile) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidate: candidateProfile,
          jobs: MOCK_JOBS
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMatches(data.matches);
    } catch (err) {
      setError('Failed to fetch matches. Ensure backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>Job Matcher AI</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Find your perfect role with our multi-factor scoring engine.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <CandidateForm onSubmit={handleMatch} />

        {loading && <div style={{ textAlign: 'center' }}>Analyzing profiles...</div>}
        {error && <div style={{ color: '#f87171', textAlign: 'center' }}>{error}</div>}

        <ResultsList matches={matches} />
      </div>
    </div>
  );
}

export default App;

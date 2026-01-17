import React from 'react';

const MatchCard = ({ match }) => {
    const { job_id, match_score, breakdown, missing_skills, recommendation_reason } = match;

    const getScoreColor = (score) => {
        if (score >= 80) return '#4ade80';
        if (score >= 50) return '#fbbf24';
        return '#f87171';
    };

    return (
        <div className="glass-card animate-fade-in" style={{ marginBottom: '1rem', borderLeft: `4px solid ${getScoreColor(match_score)}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>Job ID: {job_id}</h3>
                <span className="score-badge" style={{
                    color: getScoreColor(match_score),
                    border: `1px solid ${getScoreColor(match_score)}`
                }}>
                    {match_score}% Match
                </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{recommendation_reason}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                <ScoreItem label="Skills" value={breakdown.skill_match} />
                <ScoreItem label="Location" value={breakdown.location_match} />
                <ScoreItem label="Salary" value={breakdown.salary_match} />
                <ScoreItem label="Exp" value={breakdown.experience_match} />
                <ScoreItem label="Role" value={breakdown.role_match} />
            </div>

            {missing_skills.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#f87171' }}>Missing: </span>
                    {missing_skills.map(s => (
                        <span key={s} style={{
                            fontSize: '0.75rem',
                            background: 'rgba(248, 113, 113, 0.1)',
                            color: '#f87171',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '4px',
                            marginRight: '0.5rem'
                        }}>
                            {s}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

const ScoreItem = ({ label, value }) => (
    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{label}</div>
        <div style={{ fontWeight: 'bold' }}>{value}%</div>
    </div>
);

const ResultsList = ({ matches }) => {
    if (!matches.length) return null;

    return (
        <div style={{ marginTop: '2rem' }}>
            <h2>Matched Jobs</h2>
            {matches.map(match => (
                <MatchCard key={match.job_id} match={match} />
            ))}
        </div>
    );
};

export default ResultsList;

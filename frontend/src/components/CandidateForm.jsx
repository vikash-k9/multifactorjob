import React, { useState } from 'react';

const CandidateForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        skills: '',
        experience_years: 0,
        preferred_locations: '',
        preferred_roles: '',
        expected_salary: 0,
        degree: '',
        field: '',
        cgpa: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Transform string inputs to lists
        const profile = {
            skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
            experience_years: Number(formData.experience_years),
            preferred_locations: formData.preferred_locations.split(',').map(s => s.trim()).filter(Boolean),
            preferred_roles: formData.preferred_roles.split(',').map(s => s.trim()).filter(Boolean),
            expected_salary: Number(formData.expected_salary),
            education: {
                degree: formData.degree,
                field: formData.field,
                cgpa: Number(formData.cgpa)
            }
        };
        onSubmit(profile);
    };

    return (
        <form onSubmit={handleSubmit} className="glass-card animate-fade-in">
            <h2>Candidate Profile</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                    <label>Skills (comma separated)</label>
                    <input
                        name="skills"
                        placeholder="e.g. Python, React, Docker"
                        value={formData.skills}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Experience (Years)</label>
                    <input
                        type="number"
                        name="experience_years"
                        value={formData.experience_years}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Preferred Locations</label>
                    <input
                        name="preferred_locations"
                        placeholder="e.g. Bangalore, Remote"
                        value={formData.preferred_locations}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Preferred Roles</label>
                    <input
                        name="preferred_roles"
                        placeholder="e.g. Backend Dev, Full Stack"
                        value={formData.preferred_roles}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Expected Salary (INR)</label>
                    <input
                        type="number"
                        name="expected_salary"
                        value={formData.expected_salary}
                        onChange={handleChange}
                    />
                </div>

                {/* Education Section */}
                <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ marginTop: '0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Education</label>
                </div>
                <div>
                    <label>Degree</label>
                    <input name="degree" placeholder="B.Tech" value={formData.degree} onChange={handleChange} />
                </div>
                <div>
                    <label>Field</label>
                    <input name="field" placeholder="CS" value={formData.field} onChange={handleChange} />
                </div>
                <div>
                    <label>CGPA</label>
                    <input type="number" step="0.1" name="cgpa" value={formData.cgpa} onChange={handleChange} />
                </div>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '1.5rem' }}>
                Find Matches
            </button>
        </form>
    );
};

export default CandidateForm;

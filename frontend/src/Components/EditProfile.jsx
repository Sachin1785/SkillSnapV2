import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

function EditProfile() {
    const { user } = useUser();
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        designation: '',
        about: '',
        education: '',
        skills: '',
        projects: '',
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`http://localhost:5000/api/users/${user.id}`)
                .then((response) => {
                    setProfileData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching profile data:', error);
                });
        }
    }, [user]);

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/users/${user.id}`, { ...profileData, image: 'pfp.png' })
            .then((response) => {
                console.log('Profile updated:', response.data);
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
            });
    };

    return (
        <div style={{
            width: '95%',
            maxWidth: '800px',
            margin: '32px auto',
            padding: '16px',
            backgroundColor: '#1f2937',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            color: '#f9fafb',
        }}>
            <h2 style={{
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: 'bold',
                color: '#f9fafb',
                marginBottom: '24px',
            }}>Edit Profile</h2>

            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                    <label htmlFor="name" style={{
                        color: '#d1d5db',
                    }}>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        style={{
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #4b5563',
                            backgroundColor: '#374151',
                            color: '#f9fafb',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.3s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#4b5563'}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                    <label htmlFor="email" style={{
                        color: '#d1d5db',
                    }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        style={{
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #4b5563',
                            backgroundColor: '#374151',
                            color: '#f9fafb',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.3s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#4b5563'}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                    <label htmlFor="designation" style={{
                        color: '#d1d5db',
                    }}>Designation</label>
                    <input
                        type="text"
                        name="designation"
                        value={profileData.designation}
                        onChange={handleChange}
                        style={{
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #4b5563',
                            backgroundColor: '#374151',
                            color: '#f9fafb',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.3s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#4b5563'}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                    <label htmlFor="about" style={{
                        color: '#d1d5db',
                    }}>About</label>
                    <textarea
                        name="about"
                        value={profileData.about}
                        onChange={handleChange}
                        style={{
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #4b5563',
                            backgroundColor: '#374151',
                            color: '#f9fafb',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.3s',
                            resize: 'vertical',
                            minHeight: '120px',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#4b5563'}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                    <label htmlFor="education" style={{
                        color: '#d1d5db',
                    }}>Education</label>
                    <input
                        type="text"
                        name="education"
                        value={profileData.education}
                        onChange={handleChange}
                        style={{
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #4b5563',
                            backgroundColor: '#374151',
                            color: '#f9fafb',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.3s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#4b5563'}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                    <label htmlFor="skills" style={{
                        color: '#d1d5db',
                    }}>Skills</label>
                    <input
                        type="text"
                        name="skills"
                        value={profileData.skills}
                        onChange={handleChange}
                        style={{
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #4b5563',
                            backgroundColor: '#374151',
                            color: '#f9fafb',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.3s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#4b5563'}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                    <label htmlFor="projects" style={{
                        color: '#d1d5db',
                    }}>Projects</label>
                    <input
                        type="text"
                        name="projects"
                        value={profileData.projects}
                        onChange={handleChange}
                        style={{
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #4b5563',
                            backgroundColor: '#374151',
                            color: '#f9fafb',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.3s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#4b5563'}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: '#3b82f6',
                        color: '#fff',
                        padding: '12px',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditProfile;

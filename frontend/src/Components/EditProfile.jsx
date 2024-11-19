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
        image: '',
        // ...other fields...
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
                    // Handle the case where the user profile doesn't exist
                    // Optionally, you can redirect the user or inform them
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
        // Update the user's profile data
        axios.put(`http://localhost:5000/api/users/${user.id}`, { ...profileData, image: 'pfp.png' }) // Ensure image is set to 'pfp.png'
            .then((response) => {
                console.log('Profile updated:', response.data);
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
            });
    };

    return (
        <form className="p-4 space-y-4" onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="border p-2 w-full text-black"
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="border p-2 w-full text-black"
                />
            </div>
            <div>
                <label>Designation:</label>
                <input
                    type="text"
                    name="designation"
                    value={profileData.designation}
                    onChange={handleChange}
                    className="border p-2 w-full text-black"
                />
            </div>
            <div>
                <label>About:</label>
                <textarea
                    name="about"
                    value={profileData.about}
                    onChange={handleChange}
                    className="border p-2 w-full text-black"
                />
            </div>
            <div>
                <label>Education:</label>
                <input
                    type="text"
                    name="education"
                    value={profileData.education}
                    onChange={handleChange}
                    className="border p-2 w-full text-black"
                />
            </div>
            <div>
                <label>Skills:</label>
                <input
                    type="text"
                    name="skills"
                    value={profileData.skills}
                    onChange={handleChange}
                    className="border p-2 w-full text-black"
                />
            </div>
            <div>
                <label>Projects:</label>
                <input
                    type="text"
                    name="projects"
                    value={profileData.projects}
                    onChange={handleChange}
                    className="border p-2 w-full text-black"
                />
            </div>
            <div>
                <label>Profile Image URL:</label>
                <input
                    type="text"
                    name="image"
                    value={profileData.image}
                    onChange={handleChange}
                    className="border p-2 w-full text-black"
                />
            </div>
            {/* ...add other input fields as needed... */}
            <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
                Save
            </button>
        </form>
    );
}

export default EditProfile;

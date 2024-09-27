import React, { useState } from "react";
import { useParams } from "react-router-dom";
import './UserProfile.css';  // Assuming you're using a CSS file for custom styles

const UserProfile = (props) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("about");

  // Hardcoded user data for demonstration purposes
  const users = [
    {
      id: 1,
      name: 'User Name 1',
      image: '../assets/pfp.png',
      designation: 'Software Engineer',
      email: 'user1@example.com',
      about: 'This is user 1.',
      education: 'B.Sc. in Computer Science',
      skills: 'JavaScript, React, Node.js',
      projects: 'Project 1, Project 2'
    },
    {
      id: 2,
      name: 'User Name 2',
      image: '../assets/pfp.png',
      designation: 'Data Scientist',
      email: 'user2@example.com',
      about: 'This is user 2.',
      education: 'M.Sc. in Data Science',
      skills: 'Python, Machine Learning, Data Analysis',
      projects: 'Project A, Project B'
    },
    {
      id: 3,
      name: 'User Name 3',
      image: '../assets/pfp.png',
      designation: 'Web Developer',
      email: 'user3@example.com',
      about: 'This is user 3.',
      education: 'B.Tech in Information Technology',
      skills: 'HTML, CSS, JavaScript',
      projects: 'Project X, Project Y'
    },
    {
      id: 4,
      name: 'User Name 4',
      image: '../assets/pfp.png',
      designation: 'UX Designer',
      email: 'user4@example.com',
      about: 'This is user 4.',
      education: 'B.Des. in User Experience Design',
      skills: 'UI/UX Design, Wireframing, Prototyping',
      projects: 'Project Alpha, Project Beta'
    },
    {
      id: 'default',
      name: 'Default User',
      image: '../assets/pfp.png',
      designation: 'Software Engineer',
      email: 'userDefault@example.com',
      about: 'This is default user.',
      education: 'B.Sc. in Computer Science',
      skills: 'JavaScript, React, Node.js',
      projects: 'Project 1, Project 2'
    }
    // Add more users as needed
  ];

  // Find the user based on the ID from the URL
  const user = users.find(user => user.id === id || user.id === parseInt(id));

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-picture">
          <img
            src={user.image}
            alt="Profile Picture"
          />
        </div>
        <h2 className="name">{user.name}</h2>
        <p className="designation">{user.designation}</p>
        <p className="accounts">{user.email}</p>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab-link ${activeTab === "about" ? "active" : ""}`}
            onClick={() => openTab("about")}
          >
            About Me
          </button>
          <button
            className={`tab-link ${activeTab === "education" ? "active" : ""}`}
            onClick={() => openTab("education")}
          >
            Education
          </button>
          <button
            className={`tab-link ${activeTab === "skills" ? "active" : ""}`}
            onClick={() => openTab("skills")}
          >
            Skills
          </button>
          <button
            className={`tab-link ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => openTab("projects")}
          >
            Projects
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "about" && (
            <div className="active">
              <h3>About Me</h3>
              <p>{user.about}</p>
            </div>
          )}
          {activeTab === "education" && (
            <div className="active">
              <h3>Education</h3>
              <p>{user.education}</p>
            </div>
          )}
          {activeTab === "skills" && (
            <div className="active">
              <h3>Skills</h3>
              <p>{user.skills}</p>
            </div>
          )}
          {activeTab === "projects" && (
            <div className="active">
              <h3>Projects</h3>
              <p>{user.projects}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
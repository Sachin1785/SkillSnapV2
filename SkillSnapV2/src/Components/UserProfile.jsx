import React, { useState } from "react";
import './UserProfile.css';  // Assuming you're using a CSS file for custom styles
import image from "../assets/Screenshot 2024-08-13 190535.png";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("about");

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-picture">
          <img
            src={image}
            alt="Profile Picture"
          />
        </div>
        <h2 className="name">John Doe</h2>
        <p className="designation">Software Engineer</p>
        <p className="accounts">john.doe@example.com</p>
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
              <p>This is the about me section.</p>
            </div>
          )}
          {activeTab === "education" && (
            <div className="active">
              <h3>Education</h3>
              <p>This is the education section.</p>
            </div>
          )}
          {activeTab === "skills" && (
            <div className="active">
              <h3>Skills</h3>
              <p>This is the skills section.</p>
            </div>
          )}
          {activeTab === "projects" && (
            <div className="active">
              <h3>Projects</h3>
              <p>This is the projects section.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
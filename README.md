# SkillSnap

SkillSnap is a platform designed to showcase professional profiles, enabling users to highlight their skills, projects, and achievements. This README provides a comprehensive guide on how to use the site and details its features.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SkillSnap.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SkillSnap
   ```
3. Install the dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

### Running the Application

#### Frontend

To start the frontend application, run:
```bash
cd frontend
npm start
```
This will launch the application in your default web browser.

#### Backend

To start the backend server, run:
```bash
cd backend
npm start
```
This will start the server on `http://localhost:5000`.

### Environment Variables

Create a `.env` file in both the `frontend` and `backend` directories with the following content:

#### Frontend `.env`
```properties
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000/api/users
```

#### Backend `.env`
```properties
NODE_ENV=development
PORT=5000
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=your_sanity_dataset
SANITY_TOKEN=your_sanity_token
MONGO_URI=your_mongo_uri
```

Replace the placeholder values with your actual credentials.

## Features

### User Authentication and Security

SkillSnap leverages Clerk for robust authentication, offering:
- **Multi-Method Login**:
  - OAuth integration with platforms like Google, GitHub, and others.
  - Traditional email-password authentication.
- **Session Management**: Secure token-based mechanisms to keep user sessions active.

### Profile Management

Profiles on SkillSnap are designed to be the digital equivalent of a resume but richer and more interactive. Each profile contains:
- **About Me Section**: A concise introduction where users can share their interests, goals, and personality.
- **Education and Achievements**: Users can list degrees, certifications, and accolades, giving recruiters or collaborators a complete picture of their academic journey.
- **Skills**: Highlight technical proficiencies (e.g., programming languages, tools) and soft skills (e.g., communication, teamwork).
- **Projects**: Showcase personal or collaborative projects by naming them.
- **Social Media Links**: Integrates profiles from platforms like GitHub, LinkedIn, Twitter, or personal portfolios for extended visibility.
- **Edit Profile Feature**: Only logged-in users can edit their profiles, ensuring data integrity and ownership. ClerkID validates user-specific access, preventing unauthorized changes.

### Discover and Explore

The Explore Page is the gateway to SkillSnap’s networking opportunities, offering:
- **Comprehensive User Listings**: A catalog of all active users on the platform, displayed with 3D cards that highlight key details like name, profile picture, and skills.
- **Dynamic Search**: Users can search for peers by name. The search function dynamically updates, ensuring instant results.

### Profile Export: Resume On-the-Go

SkillSnap’s PDF Export feature transforms profiles into professional resumes, enabling users to:
- Quickly generate resumes in a consistent, clean format.
- Include key profile elements like skills, education, projects, and contact details.
- Download resumes for job applications, internships, or networking events.

### Interactive Features

SkillSnap emphasizes user engagement through interactivity:
- **Link Previews**: Hovering over external links (e.g., GitHub, project demos) provides a quick preview, saving time and improving navigation.
- **3D User Cards**: These visually appealing cards incorporate hover effects and animations, making browsing profiles engaging and modern.
- **SVG Animations**: Used across the platform for dynamic backgrounds, transitions, and loading screens, these animations add a layer of sophistication to the user experience.

## Backend: The Engine of SkillSnap

The backend is meticulously designed for scalability, security, and seamless performance.

1. **Database**:
   - **MongoDB Atlas**: A cloud-based NoSQL database that stores user profiles, skills, and projects. Its schema flexibility accommodates evolving requirements.
2. **Server-Side Logic**:
   - **Node.js & Express.js**: Powers the server, offering lightweight, fast, and scalable solutions for handling API requests and responses.
3. **API Routing**:
   - **RESTful API endpoints** handle tasks like:
     - User registration and authentication.
     - Retrieving profiles for the Explore Page.
     - Processing PDF exports.
   - Secure routes ensure only authorized users access sensitive endpoints.
4. **PDF Resume Service**:
   - Utilizes PDFKit to convert profile data into polished PDF documents.
   - Optimized for accuracy, ensuring all data is properly formatted.
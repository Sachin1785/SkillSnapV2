# SkillSnap Backend

This is the backend API for the SkillSnap application.

## Deployment Instructions for Render

1. Login to Render.com
2. Create a new Web Service
3. Connect to your GitHub repository
4. Configure the service as follows:
   - Name: skillsnap-backend
   - Root Directory: backend
   - Runtime: Node
   - Build Command: npm install
   - Start Command: npm start
   
5. Add the following environment variables:
   - NODE_ENV = production
   - PORT = 10000
   - MONGO_URI = (your MongoDB connection string)
   - SANITY_PROJECT_ID = (your Sanity project ID)
   - SANITY_DATASET = (your Sanity dataset)
   - SANITY_TOKEN = (your Sanity token)

## API Routes

- `GET /api/users` - Get all users or search users by query
- `GET /api/users/:id` - Get user profile by ID or Clerk ID
- `GET /api/users/:id/export-pdf` - Export user resume as PDF
- `POST /api/users/:id` - Create or update a user

## Development

To run locally:

```bash
npm install
npm start
```

The server will start on http://localhost:5000 in development mode.

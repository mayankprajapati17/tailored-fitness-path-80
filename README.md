
# Student Job Tracker

A web application for students to track their job applications throughout the job search process.

## Features

- Add new job applications with company, role, status, date, and optional link
- View all applications in a responsive table or card layout
- Filter applications by status
- Sort applications by date (newest/oldest)
- Update the status of applications as they progress
- Delete applications when no longer needed

## Tech Stack

### Frontend
- React with Hooks
- TailwindCSS for styling
- React Router for navigation
- Sonner for toast notifications

### Backend
- Node.js
- Express.js for API routes
- MongoDB with Mongoose for data storage

## Deployment Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account
- Vercel account (for frontend)
- Render or Railway account (for backend)

### Database Setup (MongoDB Atlas)

1. Create a new MongoDB Atlas cluster
2. Create a database named `job-tracker`
3. Create a collection named `jobs`
4. Get your MongoDB connection string (will look like: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/job-tracker`)

### Backend Deployment (Render)

1. Create a new Web Service in Render
2. Connect to your GitHub repository
3. Set the build command: `npm install`
4. Set the start command: `node server/index.js`
5. Add the environment variable `MONGODB_URI` with your MongoDB Atlas connection string
6. Deploy the service
7. Take note of the URL of your deployed backend (e.g., https://student-job-tracker-api.onrender.com)

### Frontend Deployment (Vercel)

1. Create a new project in Vercel
2. Connect to your GitHub repository
3. Add the environment variable `VITE_API_URL` with your backend URL (e.g., https://student-job-tracker-api.onrender.com/api)
4. Deploy the project

## Local Development

### Backend

1. Navigate to the server directory: `cd server`
2. Create a `.env` file based on `.env.example` and add your MongoDB URI
3. Install dependencies: `npm install`
4. Start the development server: `node index.js`

### Frontend

1. Install dependencies: `npm install`
2. Create a `.env` file with `VITE_API_URL=http://localhost:3001/api`
3. Start the development server: `npm run dev`

## Project Structure

```
student-job-tracker/
├── src/
│   ├── components/
│   │   ├── JobCard.tsx
│   │   ├── JobForm.tsx
│   │   └── JobList.tsx
│   ├── pages/
│   │   └── Index.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
└── server/
    ├── index.js
    └── .env.example
```

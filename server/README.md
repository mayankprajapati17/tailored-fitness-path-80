
# Student Job Tracker - Backend API

This is the backend API for the Student Job Tracker application, built with Node.js, Express, and MongoDB. It provides endpoints for managing job applications.

## Setup and Installation

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB Atlas account (or a local MongoDB instance for development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   cd server
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```
4. Update the `.env` file with your MongoDB connection string and other settings
5. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### GET /api/jobs
- Retrieves all job applications
- Response: Array of job objects

### POST /api/jobs
- Creates a new job application
- Request body: `{ company, role, status, date, link }`
- Response: Newly created job object

### PUT /api/jobs/:id
- Updates an existing job application
- Request body: Object with fields to update (e.g., `{ status: "Interview" }`)
- Response: Updated job object

### DELETE /api/jobs/:id
- Deletes a job application
- Response: Success message

## Development

For local development, run:
```
npm run dev
```

## Deployment

See the deployment guides for instructions on deploying to Render or Railway.

## Environment Variables

- `PORT`: The port the server runs on (defaults to 3001)
- `MONGODB_URI`: MongoDB connection string
- `NODE_ENV`: Environment setting (development, production)


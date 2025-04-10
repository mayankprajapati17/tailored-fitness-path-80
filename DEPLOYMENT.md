
# Deployment Guide

This guide explains how to deploy the Student Job Tracker application, including setting up MongoDB Atlas and deploying the backend to Render or Railway.

## 1. MongoDB Atlas Setup

### Create a MongoDB Atlas Cluster

1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (the free tier is sufficient)
3. Set up a database user:
   - Go to Security > Database Access > Add New Database User
   - Create a username and password (save these for your connection string)
   - Set appropriate permissions (readWrite on the job-tracker database)
4. Set up network access:
   - Go to Security > Network Access > Add IP Address
   - For development: Add your current IP address
   - For production: Add `0.0.0.0/0` to allow access from anywhere (or restrict to your deployment provider's IPs)
5. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (it will look like: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/job-tracker`)
   - Replace `<username>` and `<password>` with your database user credentials

## 2. Backend Deployment

### Option 1: Deploy to Render

1. Sign up for an account at [Render](https://render.com)
2. Create a new Web Service:
   - Connect your GitHub repository or upload your code
   - Choose the main directory where your backend code is located
   - Set the build command: `npm install`
   - Set the start command: `node index.js`
3. Configure environment variables:
   - Add `MONGODB_URI` with your MongoDB Atlas connection string
   - Add any other required environment variables (e.g., `PORT`)
4. Deploy the service
5. Once deployed, Render will provide a URL for your API (e.g., `https://student-job-tracker-api.onrender.com`)

### Option 2: Deploy to Railway

1. Sign up for an account at [Railway](https://railway.app)
2. Create a new project:
   - Connect your GitHub repository
   - Deploy the backend service
3. Configure environment variables:
   - Add `MONGODB_URI` with your MongoDB Atlas connection string
   - Add any other required environment variables
4. Deploy the service
5. Railway will provide a URL for your API

## 3. Frontend Integration

After deploying your backend, update your frontend to use the deployed API URL:

1. Create a `.env` file in your frontend project (if not already created)
2. Add the backend URL as an environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
3. Make sure your frontend code uses this environment variable for API calls:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
   
   // Example fetch call
   fetch(`${API_URL}/jobs`)
     .then(response => response.json())
     .then(data => console.log(data));
   ```

## 4. Vercel Deployment (Frontend)

1. If you haven't already deployed your frontend to Vercel:
   - Sign up for [Vercel](https://vercel.com)
   - Connect your GitHub repository
   - Configure the build settings
2. Add the environment variable:
   - Go to your project settings
   - Add `VITE_API_URL=https://your-backend-url.onrender.com/api`
3. Redeploy your frontend application

## 5. Testing the Full Integration

1. Navigate to your Vercel-deployed frontend
2. Try adding a new job application
3. Verify that the data is saved to MongoDB Atlas
4. Test updating and deleting job applications

## Troubleshooting

- **CORS Issues**: Ensure the backend has CORS configured properly
- **Database Connection**: Check MongoDB Atlas network access settings
- **API URL**: Make sure the frontend is using the correct API URL
- **Environment Variables**: Verify all environment variables are set correctly


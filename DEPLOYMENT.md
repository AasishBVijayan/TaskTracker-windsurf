# 🚀 Deployment Guide

## Quick Deploy Options

### 1. Railway (Recommended - Full Stack)
```bash
# Frontend: https://railway.app/new
# Backend: https://railway.app/new
# Connect GitHub repo
# Set environment variables
```

### 2. Vercel + Railway (Best Performance)
**Frontend (Vercel):**
1. Connect GitHub to Vercel
2. Select `client` folder
3. Set `REACT_APP_API_URL` to Railway backend URL

**Backend (Railway):**
1. Connect GitHub to Railway
2. Select `server` folder
3. Set MongoDB URI and JWT_SECRET

### 3. Heroku (Alternative)
```bash
# Install Heroku CLI
heroku create your-app-name
git push heroku main
```

## Environment Variables Needed

**Backend:**
- `MONGODB_URI` (MongoDB Atlas)
- `JWT_SECRET` (random string)
- `CLIENT_URL` (frontend URL)

**Frontend:**
- `REACT_APP_API_URL` (backend URL)

## MongoDB Setup
Use MongoDB Atlas for production:
1. Create free account
2. Create cluster
3. Get connection string
4. Add to environment variables

## Commands
```bash
# Build frontend
cd client && npm run build

# Start production server
cd server && npm start
```

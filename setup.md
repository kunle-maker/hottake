# HotTakes™ Setup & Deployment Guide

Created by Ayokunle | Portfolio: https://ayox.my.id

---

## Overview

HotTakes™ is a production-grade football social media platform built with Express.js, React, TypeScript, TailwindCSS, PostgreSQL (via Prisma ORM), and Google Gemini 3.6 Flash. This guide covers local setup, database configuration, external API credentials, and production deployment on Render.

---

## Table of Contents

1. Prerequisites
2. Local Development Setup
3. Environment Variables Configuration
4. PostgreSQL & Database Configuration
5. API-FOOTBALL Integration (Real Fixtures & Transfers)
6. Google OAuth Setup
7. Cloudinary Media Storage Setup
8. Render Deployment (Backend + Render PostgreSQL)
9. Troubleshooting & FAQ

---

## 1. Prerequisites

Before running or deploying HotTakes™, ensure you have installed:

- Node.js (version 18 or higher)
- npm (version 9 or higher)
- PostgreSQL (version 14 or higher for local database, or use Render Managed PostgreSQL)
- Git

---

## 2. Local Development Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/hottakes-football.git
cd hottakes-football
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy the example environment file and fill in your keys:
```bash
cp .env.example .env
```

### Step 4: Run Development Server
```bash
npm run dev
```
The unified full-stack development server will start on `http://localhost:3000`.

---

## 3. Environment Variables Configuration

Create a `.env` file at the root of the project with the following keys:

```env
# App & Server Configuration
PORT=3000
NODE_ENV=production
CLIENT_URL=https://hottakes-football.onrender.com

# PostgreSQL Connection String (Render PostgreSQL or Local)
DATABASE_URL=postgresql://hottakes_user:password@localhost:5432/hottakes_db

# Authentication Secrets
JWT_SECRET=your_custom_jwt_secret_key_2026
JWT_REFRESH_SECRET=your_custom_jwt_refresh_secret_2026

# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://hottakes-football.onrender.com/api/auth/google/callback

# API-FOOTBALL Credentials (https://www.api-football.com / RapidAPI)
API_FOOTBALL_KEY=your_api_football_key

# Cloudinary Media Upload Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google Gemini 3.6 AI Hot Take Engine
GEMINI_API_KEY=your_gemini_api_key
```

---

## 4. PostgreSQL & Database Configuration

HotTakes™ uses PostgreSQL for persistent data storage.

### Local PostgreSQL Setup

1. Install PostgreSQL on your machine:
   - macOS: `brew install postgresql`
   - Ubuntu/Debian: `sudo apt install postgresql postgresql-contrib`
   - Windows: Download from https://www.postgresql.org/download/windows/

2. Create a database and user:
```sql
CREATE DATABASE hottakes_db;
CREATE USER hottakes_user WITH PASSWORD 'securepassword';
GRANT ALL PRIVILEGES ON DATABASE hottakes_db TO hottakes_user;
```

3. Update `DATABASE_URL` in your `.env` file:
```env
DATABASE_URL=postgresql://hottakes_user:securepassword@localhost:5432/hottakes_db
```

4. Run database migrations:
```bash
npx prisma migrate dev --name init
```

---

## 5. API-FOOTBALL Integration (Real Fixtures & Transfers)

To fetch live match scores, standings, and transfer market movements:

1. Register an account at https://www.api-football.com or via RapidAPI.
2. Obtain your API key from the API Dashboard.
3. Add `API_FOOTBALL_KEY=your_key_here` to your environment variables.
4. HotTakes™ automatically caches API responses for 5 minutes in server memory to conserve API request quotas.
5. If `API_FOOTBALL_KEY` is omitted, the app gracefully defaults to the built-in live match simulation engine.

---

## 6. Google OAuth Setup

To enable "Sign in with Google":

1. Open the Google Cloud Console (https://console.cloud.google.com).
2. Create a new project named "HotTakes Football".
3. Navigate to **APIs & Services** -> **OAuth consent screen** and select External.
4. Under **Credentials**, click **Create Credentials** -> **OAuth client ID**.
5. Set Application Type to **Web Application**.
6. Add Authorized JavaScript origins: `http://localhost:3000` and `https://your-app.onrender.com`.
7. Add Authorized redirect URIs: `http://localhost:3000/api/auth/google/callback` and `https://your-app.onrender.com/api/auth/google/callback`.
8. Copy the Client ID and Client Secret into your `.env` file under `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

---

## 7. Cloudinary Media Storage Setup

To handle photo uploads for post media and user avatars:

1. Register a free account at https://cloudinary.com.
2. Go to your Dashboard and copy:
   - Cloud Name
   - API Key
   - API Secret
3. Add these values to your `.env` file under `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

---

## 8. Render Deployment (Backend + Render PostgreSQL)

### Option A: Automatic Blueprint Deployment (Recommended)

1. Push your repository to GitHub or GitLab.
2. Log in to your Render dashboard (https://render.com).
3. Click **New +** -> **Blueprint**.
4. Connect your repository. Render will automatically detect `render.yaml`.
5. Render will create:
   - Web Service (`hottakes-football-app`)
   - Managed PostgreSQL Database (`hottakes-postgres-db`)
6. Enter your secret environment variables (`GEMINI_API_KEY`, `API_FOOTBALL_KEY`, `CLOUDINARY_*`, `GOOGLE_*`) when prompted in the Render dashboard.
7. Click **Apply**. Render will build and launch your application.

### Option B: Manual Web Service + Database Creation

1. In Render Dashboard, click **New +** -> **PostgreSQL**.
   - Name: `hottakes-postgres-db`
   - Database: `hottakes_db`
   - User: `hottakes_user`
   - Plan: Free
   - Copy the **Internal Database URL**.

2. Click **New +** -> **Web Service**.
   - Connect your Git repository.
   - Environment: `Node`
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Add Environment Variables:
     - `NODE_ENV`: `production`
     - `PORT`: `3000`
     - `DATABASE_URL`: (Paste your Render PostgreSQL Internal Database URL)
     - `GEMINI_API_KEY`: (Your Gemini key)
     - `API_FOOTBALL_KEY`: (Your API-FOOTBALL key)
     - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
     - `JWT_SECRET`, `JWT_REFRESH_SECRET`
3. Click **Deploy Web Service**.

---

## 9. Troubleshooting & FAQ

### Q1: The dev server fails with port binding errors.
Ensure no other process is utilizing port 3000. Use `lsof -i :3000` or `killall node` to clear port 3000.

### Q2: Gemini AI Analysis fails or returns default ratings.
Ensure `GEMINI_API_KEY` is present in your environment variables. Free keys can be generated at https://aistudio.google.com.

### Q3: Live fixtures are showing simulated scores instead of real API data.
Verify that `API_FOOTBALL_KEY` is set correctly in your `.env` or Render environment settings. Check your API-FOOTBALL quota at https://www.api-football.com.

---

Created by Ayokunle | Portfolio: https://ayox.my.id

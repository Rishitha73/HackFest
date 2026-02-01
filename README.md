# 🎓 Academic & Career Roadmap Platform

A comprehensive web platform designed to help pre-university and undergraduate students explore academic paths, discover career opportunities, and receive AI-powered personalized learning roadmaps.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Test Credentials](#-test-credentials)
- [API Documentation](#-api-documentation)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

See [FEATURES.txt](FEATURES.txt) for detailed feature documentation.

**Quick Overview:**
- 🎯 **Role-Based Dashboards** - Different experiences for pre-university and undergraduate students
- 🤖 **AI-Powered Roadmaps** - Generate personalized learning paths using LLM integration
- 📚 **Comprehensive Content** - 50+ degrees, branches, and specialized courses
- 💾 **Save & Track** - Save roadmaps and track your learning journey
- 🔐 **Secure Authentication** - JWT-based authentication system

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js (v16+)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken) + bcryptjs
- **LLM Integration:** Grok (xAI) or OpenAI API

### Frontend
- **Framework:** React.js 18
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Notifications:** React-Toastify

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - Local installation - [Download](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas account (free) - [Sign up](https://www.mongodb.com/cloud/atlas/register)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended
- **LLM API Key** - Get from [xAI](https://x.ai/) or [OpenAI](https://openai.com/)

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd trial-project
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
# Create a file named .env in the backend folder with the following content:
```

**Backend `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/academic-roadmap
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/academic-roadmap

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
LLM_API_KEY=your_api_key_here
LLM_API_URL=https://api.x.ai/v1/chat/completions
NODE_ENV=development
```

```bash
# Seed the database with sample data (IMPORTANT - Run this first time)
node scripts/seed.js

# Start the backend server
npm start
# OR for development with auto-reload:
npm run dev
```

✅ Backend should now be running on **http://localhost:5000**

### 3️⃣ Frontend Setup

Open a **new terminal** and:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
# Create a file named .env in the frontend folder with the following content:
```

**Frontend `.env` file:**
```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

```bash
# Start the frontend development server
npm start
```

✅ Frontend should now be running on **http://localhost:3000**

---

## ▶️ Running the Application

### Quick Start (After Initial Setup)

You need **TWO terminals** running simultaneously:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Then open your browser and navigate to **http://localhost:3000**

---

## 📁 Project Structure

```
trial-project/
├── backend/                    # Node.js/Express Backend
│   ├── models/                # MongoDB Schemas
│   │   ├── User.js           # User authentication model
│   │   ├── Degree.js         # Degree programs
│   │   ├── Branch.js         # Branch specializations
│   │   ├── Course.js         # Course content
│   │   └── Roadmap.js        # Generated roadmaps
│   ├── routes/               # API Endpoints
│   │   ├── auth.js          # Register/Login
│   │   ├── degrees.js       # Degrees & branches
│   │   ├── courses.js       # Courses
│   │   ├── roadmaps.js      # Roadmap generation & management
│   │   └── profile.js       # User profile
│   ├── middleware/          
│   │   └── auth.js          # JWT authentication
│   ├── utils/
│   │   ├── llm.js           # LLM integration
│   │   └── mockData.js      # Sample data
│   ├── scripts/
│   │   └── seed.js          # Database seeding
│   ├── server.js            # Main server file
│   ├── package.json
│   └── .env                 # Environment variables
│
├── frontend/                  # React.js Frontend
│   ├── src/
│   │   ├── pages/           # Page Components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Degrees.js
│   │   │   ├── DegreeDetail.js
│   │   │   ├── BranchDetail.js
│   │   │   ├── CourseDetail.js
│   │   │   ├── Roadmaps.js
│   │   │   ├── RoadmapDetail.js
│   │   │   ├── RoadmapGeneration.js  # New roadmap display page
│   │   │   ├── Profile.js
│   │   │   └── NotFound.js
│   │   ├── components/      # Reusable Components
│   │   │   ├── Header.js
│   │   │   ├── RoadmapGenerator.js  # Floating button
│   │   │   ├── InteractiveRoadmap.js
│   │   │   └── ProtectedRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js  # Global auth state
│   │   ├── App.js           # Routes configuration
│   │   ├── index.js         # Entry point
│   │   └── index.css        # Tailwind styles
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .env                 # Environment variables
│
├── docs/                     # Documentation & Design Assets
│   ├── DEVELOPMENT.md
│   ├── image3.jpeg          # Design reference
│   ├── imge2.jpeg
│   └── WhatsApp Image...
│
├── README.md                # This file
├── FEATURES.txt             # Detailed feature documentation
└── credentials.txt          # Test user credentials
```

---

## 🔑 Test Credentials

After running the seed script, you can use these test accounts or create your own by registering.

### Creating a New Account (Recommended)

1. Go to http://localhost:3000/register
2. Choose your role:
   - **Pre-University**: To explore degrees and branches
   - **Undergraduate**: To see specialized courses (select a branch)

### Available Branches for Undergraduate Registration:
- Computer Science and Engineering
- Mechanical Engineering
- Electrical Engineering
- Civil Engineering
- Electronics and Communication Engineering

### Existing Test Accounts

See `credentials.txt` for a full list of test accounts. You'll need to use the password you set during registration.

---

## 🌐 Environment Variables

### Backend `.env`

---

## 🌐 Environment Variables

### Backend `.env`

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/academic-roadmap
# For MongoDB Atlas use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/academic-roadmap

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# LLM Configuration (for AI Roadmap Generation)
LLM_API_KEY=your_api_key_from_xai_or_openai
LLM_API_URL=https://api.x.ai/v1/chat/completions
# For OpenAI use:
# LLM_API_URL=https://api.openai.com/v1/chat/completions
```

### Frontend `.env`

```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login user | No |

### Degrees & Branches

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/degrees` | Get all degrees | Yes |
| GET | `/api/v1/degrees/:degreeId/branches` | Get branches for a degree | Yes |
| GET | `/api/v1/degrees/branch/:branchId` | Get branch details | Yes |

### Courses

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/courses` | Get courses (filtered by branch) | Yes |
| GET | `/api/v1/courses/:courseId` | Get course details | Yes |

### Roadmaps

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/roadmaps/generate` | Generate AI roadmap | Yes |
| POST | `/api/v1/roadmaps/save` | Save roadmap | Yes |
| GET | `/api/v1/roadmaps` | Get user's roadmaps | Yes |
| GET | `/api/v1/roadmaps/:roadmapId` | Get specific roadmap | Yes |
| DELETE | `/api/v1/roadmaps/:roadmapId` | Delete roadmap | Yes |

### Profile

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/profile` | Get user profile | Yes |
| PUT | `/api/v1/profile` | Update user profile | Yes |

---

## 🚨 Troubleshooting

### Backend Issues

**Problem: "Error: listen EADDRINUSE: address already in use :::5000"**
- **Solution:** Port 5000 is already in use. Kill the process:
  ```bash
  # Windows PowerShell
  Get-Process -Name node | Stop-Process -Force
  
  # Linux/Mac
  lsof -ti:5000 | xargs kill -9
  ```

**Problem: "MongoNetworkError: failed to connect to server"**
- **Solution:** Make sure MongoDB is running:
  ```bash
  # If using local MongoDB
  mongod
  
  # If using MongoDB Atlas, check your connection string in .env
  ```

**Problem: "Roadmap generation fails"**
- **Solution:** Verify your LLM API key is correct in `.env`
- Check you have credits/quota remaining on your API account
- Check the LLM_API_URL is correct for your provider

### Frontend Issues

**Problem: "Network Error" when making API calls**
- **Solution:** Make sure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Clear browser cache and reload

**Problem: "Module not found" errors**
- **Solution:** Delete `node_modules` and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

**Problem: No data showing on dashboard**
- **Solution:** Make sure you ran the seed script:
  ```bash
  cd backend
  node scripts/seed.js
  ```

---

## 📝 Usage Guide

### For Pre-University Students

1. **Register** with role: "Pre-University"
2. **Dashboard** - Browse available degree programs
3. **Explore Degrees** - Click on any degree to see branches
4. **Branch Details** - View branch overview, career prospects, and trial tasks
5. **Generate Roadmap** - Click the floating button, enter interests and goals
6. **Save & Track** - Save your roadmap and access it anytime from "My Roadmaps"

### For Undergraduate Students

1. **Register** with role: "Undergraduate" and select your branch
2. **Dashboard** - See courses specific to your branch
3. **Course Details** - View advanced topics and project ideas
4. **Generate Roadmap** - Create personalized learning paths
5. **Track Progress** - Save and manage multiple roadmaps

---

## 🎯 Key Features Walkthrough

### 1. Roadmap Generation

The AI-powered roadmap generator is accessible via the floating button on the dashboard:

1. Click the purple floating button (bottom right)
2. Enter your **interests** (e.g., "Web Development, AI, Mobile Apps")
3. Enter your **focus area** (e.g., "4-year comprehensive plan" or "Career transition")
4. Click **Generate Roadmap**
5. View the interactive roadmap with:
   - Timeline-based phases
   - Skills to master
   - Learning resources (courses, books, tutorials)
6. Click **Save Roadmap** to store it permanently

### 2. Interactive Roadmap Display

- Clean white background with dot pattern
- Numbered circular timeline indicators
- Expandable steps showing skills
- Expandable skills showing resources
- Color-coded levels (phases → skills → resources)
- Direct links to learning materials

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Support

For issues or questions:
- Check the troubleshooting section above
- Review `FEATURES.txt` for detailed feature documentation
- Check existing issues on the repository

---

**Built with ❤️ to help students navigate their academic journey**

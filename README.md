PathFinder AI is a mobile-first MERN-based platform that helps students make informed academic and career decisions by exploring domains, experiencing mini projects, and generating personalized AI roadmaps with learning resources.

The platform supports two types of users:

🎓 Pre-UG Students (before choosing a degree/branch)

🎓 UG Students (already in a branch)

The system uses AI (LLM) to generate learning roadmaps and curated resources based on user interests and domain choices.

🎯 Problem Statement

Students often choose degrees, branches, and career paths without proper understanding of domains, skills, and outcomes.
This leads to confusion, dissatisfaction, and skill mismatch.

PathFinder AI solves this by:

Letting students explore domains visually

Providing mini project simulations

Generating personalized AI roadmaps

Recommending learning resources

Saving progress in user profiles

🧭 Website Flow (End-to-End)
1️⃣ Welcome Screen

User selects:

Pre-UG Student

UG Student

2️⃣ Authentication (Login / Register)
Register

Fields:

Name

Email

Password

Role: Pre-UG / UG

If UG:

Degree (BTech / BSc / BCom / BA)

Branch (CSE / ECE / EEE / Mechanical / Civil)

Backend returns:

JWT Token

User profile

Role information

3️⃣ Role-Based Dashboard (Backend Controlled)

Frontend renders dashboards based on backend response.

A) Pre-UG Dashboard

Flow:

Degrees → Branches → Domain Details → Mini Project → Roadmap


Example:

BTech → CSE → Web Development


Displayed:

Degree cards (BTech, BSc, BCom, BA)

Branch list

Domain details

B) UG Dashboard

Flow:

Branch → Domains → Domain Details → Mini Project → Roadmap


Example (CSE):

Web Development

AI/ML

Cyber Security

Data Science

App Development

4️⃣ Domain Detail Page

For each domain/branch:

Displayed information:

Domain name

Description

Skills required

Career options

Mini project simulation

Mini Project Example:

Web Development → Build a simple portfolio website

AI/ML → Predict marks using Python

Mechanical → Design a basic vehicle model concept

User Feedback:

👍 Interested

👎 Not Interested

Feedback is sent to backend and stored.

5️⃣ Floating AI Roadmap Generator (Core Feature)

A floating button appears at bottom-right:

🤖 Generate Roadmap

Flow:

User clicks “Generate Roadmap”

Modal opens:

Select domain (current or other)

Backend API generates roadmap using LLM

Roadmap displayed in structured format

Example Roadmap:

Phase 1: HTML & CSS

Phase 2: JavaScript

Phase 3: React

Phase 4: Node.js & MongoDB

6️⃣ Resource Generation Flow

Below roadmap:

Question:

Do you want learning resources for this roadmap?

Options:

Yes

No

If YES:

Backend generates curated resources

Display:

YouTube playlists 🎥

PDF notes 📚

User can click:

Save to Profile

Roadmap and resources are stored in user profile.

7️⃣ Profile Page

User profile displays:

My Roadmaps

My Resources

Selected domains

Saved learning paths

Data is fetched from backend.

🏗️ System Architecture (MERN)
Frontend

React.js (Mobile-first)

Tailwind CSS

React Router

Axios

Backend

Node.js

Express.js

MongoDB

JWT Authentication

LLM Integration (AI Roadmap)

🗂️ Backend Structure
backend/
├── config/
├── models/
├── controllers/
├── routes/
├── middleware/
├── utils/
├── seed/
├── server.js

🗄️ Database Models
User

name

email

password

role (pre-ug / ug)

degree (optional)

branch (optional)

Degree

name

branches[]

Domain

branch

name

description

skills[]

careers[]

miniProject

Roadmap

userId

domain

steps[]

Resource

skill

youtubeLink

pdfLink

Interest

userId

domain

interested (true/false)

🔌 API Routes (MVP)
Auth

POST /auth/register

POST /auth/login

GET /auth/profile

Degrees & Domains

GET /degrees

GET /degrees/:degree

GET /domains/:branch

GET /domains/detail/:name

AI & Resources

POST /api/ai/roadmap

POST /api/resources/generate

User Actions

POST /interest

GET /profile

📱 Mobile-First Design

Optimized for mobile screens

Bottom navigation bar:

Home

Explore

Roadmap

Profile

Floating AI button

Card-based UI

Clean SaaS-style design

🧪 MVP Scope (Hackathon Ready)

Implemented in MVP:

✅ Role-based dashboards
✅ Degree → Branch → Domain exploration
✅ Mini project simulation
✅ AI roadmap generation
✅ Resource recommendation
✅ Profile storage

Future scope (not in MVP):

Working professionals dashboard

Real-time YouTube & Drive API integration

Mentorship & community

Advanced analytics & recommendations

🏆 Innovation Highlight

Unlike traditional career guidance platforms, PathFinder AI:

Lets students experience domains before choosing them

Uses AI to generate personalized learning paths

Provides curated resources in one place

Adapts guidance based on user interest and branch


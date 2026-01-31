ClarityForge is a mobile-first MERN-based platform that helps students make informed academic and career decisions by exploring domains, experiencing mini projects, and generating personalized AI roadmaps with learning resources.

The platform supports two types of users:

🎓 Pre-UG Students (before choosing a degree/branch)

🎓 UG Students (already in a branch)

<<<<<<< HEAD
The system uses AI (LLM) to generate learning roadmaps and curated resources based on user interests and domain choices.

=======

The system uses AI (LLM) to generate learning roadmaps and curated resources based on user interests and domain choices.


---

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
🎯 Problem Statement

Students often choose degrees, branches, and career paths without proper understanding of domains, skills, and outcomes.
This leads to confusion, dissatisfaction, and skill mismatch.

PathFinder AI solves this by:

Letting students explore domains visually

Providing mini project simulations

Generating personalized AI roadmaps

Recommending learning resources

Saving progress in user profiles

<<<<<<< HEAD
🧭 Website Flow (End-to-End)
=======


---

🧭 Website Flow (End-to-End)

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
1️⃣ Welcome Screen

User selects:

Pre-UG Student

UG Student

<<<<<<< HEAD
2️⃣ Authentication (Login / Register)
=======


---

2️⃣ Authentication (Login / Register)

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Register

Fields:

Name

Email

Password

Role: Pre-UG / UG

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
If UG:

Degree (BTech / BSc / BCom / BA)

Branch (CSE / ECE / EEE / Mechanical / Civil)

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Backend returns:

JWT Token

User profile

Role information

<<<<<<< HEAD
=======


---

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
3️⃣ Role-Based Dashboard (Backend Controlled)

Frontend renders dashboards based on backend response.

A) Pre-UG Dashboard

Flow:

Degrees → Branches → Domain Details → Mini Project → Roadmap

<<<<<<< HEAD

=======
>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Example:

BTech → CSE → Web Development

<<<<<<< HEAD

=======
>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Displayed:

Degree cards (BTech, BSc, BCom, BA)

Branch list

Domain details

<<<<<<< HEAD
=======


---

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
B) UG Dashboard

Flow:

Branch → Domains → Domain Details → Mini Project → Roadmap

<<<<<<< HEAD

=======
>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Example (CSE):

Web Development

AI/ML

Cyber Security

Data Science

App Development

<<<<<<< HEAD
=======


---

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
4️⃣ Domain Detail Page

For each domain/branch:

Displayed information:

Domain name

Description

Skills required

Career options

Mini project simulation

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Mini Project Example:

Web Development → Build a simple portfolio website

AI/ML → Predict marks using Python

Mechanical → Design a basic vehicle model concept

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
User Feedback:

👍 Interested

👎 Not Interested

<<<<<<< HEAD
Feedback is sent to backend and stored.

=======

Feedback is sent to backend and stored.


---

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
5️⃣ Floating AI Roadmap Generator (Core Feature)

A floating button appears at bottom-right:

<<<<<<< HEAD
🤖 Generate Roadmap

Flow:

User clicks “Generate Roadmap”

Modal opens:

Select domain (current or other)

Backend API generates roadmap using LLM

Roadmap displayed in structured format
=======
> 🤖 Generate Roadmap



Flow:

1. User clicks “Generate Roadmap”


2. Modal opens:

Select domain (current or other)



3. Backend API generates roadmap using LLM


4. Roadmap displayed in structured format


>>>>>>> 4f442b2f6456f310290943c493240cf309e02372

Example Roadmap:

Phase 1: HTML & CSS

Phase 2: JavaScript

Phase 3: React

Phase 4: Node.js & MongoDB

<<<<<<< HEAD
=======


---

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
6️⃣ Resource Generation Flow

Below roadmap:

Question:

<<<<<<< HEAD
Do you want learning resources for this roadmap?
=======
> Do you want learning resources for this roadmap?


>>>>>>> 4f442b2f6456f310290943c493240cf309e02372

Options:

Yes

No

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
If YES:

Backend generates curated resources

Display:

YouTube playlists 🎥

PDF notes 📚

<<<<<<< HEAD
User can click:

Save to Profile

Roadmap and resources are stored in user profile.

=======


User can click:

> Save to Profile



Roadmap and resources are stored in user profile.


---

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
7️⃣ Profile Page

User profile displays:

My Roadmaps

My Resources

Selected domains

Saved learning paths

<<<<<<< HEAD
Data is fetched from backend.

🏗️ System Architecture (MERN)
=======

Data is fetched from backend.


---

🏗️ System Architecture (MERN)

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Frontend

React.js (Mobile-first)

Tailwind CSS

React Router

Axios

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Backend

Node.js

Express.js

MongoDB

JWT Authentication

LLM Integration (AI Roadmap)

<<<<<<< HEAD
🗂️ Backend Structure
=======


---

🗂️ Backend Structure

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
backend/
├── config/
├── models/
├── controllers/
├── routes/
├── middleware/
├── utils/
├── seed/
├── server.js

<<<<<<< HEAD
🗄️ Database Models
=======

---

🗄️ Database Models

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
User

name

email

password

role (pre-ug / ug)

degree (optional)

branch (optional)

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Degree

name

branches[]

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Domain

branch

name

description

skills[]

careers[]

miniProject

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Roadmap

userId

domain

steps[]

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Resource

skill

youtubeLink

pdfLink

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Interest

userId

domain

interested (true/false)

<<<<<<< HEAD
🔌 API Routes (MVP)
=======


---

🔌 API Routes (MVP)

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Auth

POST /auth/register

POST /auth/login

GET /auth/profile

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Degrees & Domains

GET /degrees

GET /degrees/:degree

GET /domains/:branch

GET /domains/detail/:name

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
AI & Resources

POST /api/ai/roadmap

POST /api/resources/generate

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
User Actions

POST /interest

GET /profile

<<<<<<< HEAD
=======


---

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
📱 Mobile-First Design

Optimized for mobile screens

Bottom navigation bar:

Home

Explore

Roadmap

Profile

<<<<<<< HEAD
=======

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
Floating AI button

Card-based UI

Clean SaaS-style design

<<<<<<< HEAD
=======


---

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
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

<<<<<<< HEAD
=======


---

>>>>>>> 4f442b2f6456f310290943c493240cf309e02372
🏆 Innovation Highlight

Unlike traditional career guidance platforms, PathFinder AI:

Lets students experience domains before choosing them

Uses AI to generate personalized learning paths

Provides curated resources in one place

Adapts guidance based on user interest and branch

<<<<<<< HEAD
=======


---

⏱️ Hackathon Strategy

The MVP focuses on:

One complete working flow

Clean architecture

AI-driven personalization

Scalable design


This ensures feasibility within 24 hours while demonstrating real-world impact.


---

👩‍💻 Team Vision

PathFinder AI aims to become a unified platform for:

Students choosing careers

College students exploring domains
>>>>>>> 4f442b2f6456f310290943c493240cf309e02372

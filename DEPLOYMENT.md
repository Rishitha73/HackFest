═══════════════════════════════════════════════════════════════════════════════
                        DEPLOYMENT GUIDE
                Academic & Career Roadmap Platform
═══════════════════════════════════════════════════════════════════════════════

This guide will help you deploy your application to get a live link.

═══════════════════════════════════════════════════════════════════════════════
PART 1: PREPARE MONGODB ATLAS (DATABASE)
═══════════════════════════════════════════════════════════════════════════════

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a FREE account
3. Create a new cluster (M0 Free tier)
4. Wait for cluster to be created (2-3 minutes)
5. Click "Connect" on your cluster
6. Add your current IP address (or allow access from anywhere: 0.0.0.0/0)
7. Create a database user (username and password)
8. Choose "Connect your application"
9. Copy the connection string (looks like):
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
10. Replace <password> with your actual password

SAVE THIS CONNECTION STRING - YOU'LL NEED IT!

═══════════════════════════════════════════════════════════════════════════════
PART 2: DEPLOY BACKEND TO RENDER
═══════════════════════════════════════════════════════════════════════════════

Step 1: Push Code to GitHub
----------------------------
1. Go to https://github.com/new
2. Create a new repository (name: academic-roadmap-platform)
3. Don't initialize with README (we already have files)
4. In your project folder, run:

   cd C:\Users\rishi\OneDrive\Desktop\trial-project
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/academic-roadmap-platform.git
   git push -u origin main

Step 2: Deploy on Render
-------------------------
1. Go to https://render.com and sign up (use GitHub account)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Name: academic-roadmap-backend
   - Root Directory: backend
   - Environment: Node
   - Build Command: npm install
   - Start Command: npm start
   - Instance Type: Free

5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string_from_part1
   JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
   LLM_API_KEY=your_llm_api_key_from_xai_or_openai
   LLM_API_URL=https://api.x.ai/v1/chat/completions
   NODE_ENV=production

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (looks like): https://academic-roadmap-backend.onrender.com

SAVE THIS BACKEND URL - YOU'LL NEED IT!

Step 3: Seed the Production Database
-------------------------------------
After deployment completes, run the seed script:

1. In Render dashboard, go to your service
2. Click "Shell" tab
3. Run: node scripts/seed.js
4. Run: node scripts/createTestAccounts.js

═══════════════════════════════════════════════════════════════════════════════
PART 3: DEPLOY FRONTEND TO VERCEL
═══════════════════════════════════════════════════════════════════════════════

Step 1: Prepare Frontend
-------------------------
Update frontend/.env with your Render backend URL:

REACT_APP_API_URL=https://academic-roadmap-backend.onrender.com/api/v1

Step 2: Deploy on Vercel
-------------------------
1. Go to https://vercel.com and sign up (use GitHub account)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Create React App
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: build
   
5. Add Environment Variable:
   Name: REACT_APP_API_URL
   Value: https://academic-roadmap-backend.onrender.com/api/v1
   
6. Click "Deploy"
7. Wait for deployment (3-5 minutes)
8. Copy your live URL (looks like): https://academic-roadmap-platform.vercel.app

THIS IS YOUR LIVE LINK! 🎉

═══════════════════════════════════════════════════════════════════════════════
PART 4: TEST YOUR DEPLOYMENT
═══════════════════════════════════════════════════════════════════════════════

1. Visit your Vercel URL: https://your-app.vercel.app
2. Click "Sign In" or "Register"
3. Login with test account:
   Email: cse.student@example.com
   Password: password123

4. Test features:
   ✓ Login/Registration
   ✓ View Dashboard
   ✓ Generate Roadmap
   ✓ Save Roadmap

═══════════════════════════════════════════════════════════════════════════════
ALTERNATIVE: QUICK DEPLOY WITH NETLIFY (FRONTEND)
═══════════════════════════════════════════════════════════════════════════════

If you prefer Netlify over Vercel:

1. Go to https://app.netlify.com/signup
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select your repository
4. Configure:
   - Base directory: frontend
   - Build command: npm run build
   - Publish directory: frontend/build
   
5. Add Environment Variable:
   REACT_APP_API_URL=https://academic-roadmap-backend.onrender.com/api/v1

6. Click "Deploy site"

═══════════════════════════════════════════════════════════════════════════════
ALTERNATIVE: RAILWAY (BACKEND)
═══════════════════════════════════════════════════════════════════════════════

If Render doesn't work, try Railway:

1. Go to https://railway.app and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect and deploy
5. Add the same environment variables as above
6. Get your backend URL from Railway dashboard

═══════════════════════════════════════════════════════════════════════════════
TROUBLESHOOTING
═══════════════════════════════════════════════════════════════════════════════

Backend Issues:
--------------
❌ Build fails: Check that all dependencies are in package.json
❌ Can't connect to MongoDB: Verify connection string and IP whitelist
❌ 502 errors: Backend is starting (Render free tier sleeps), wait 30 seconds

Frontend Issues:
---------------
❌ Can't connect to backend: Check REACT_APP_API_URL is correct
❌ CORS errors: Make sure backend has CORS configured (already done)
❌ Build fails: Check that .env has correct API URL

General Tips:
------------
• Free tier services sleep after inactivity - first request takes ~30 seconds
• Always use HTTPS URLs for production
• Keep your MongoDB Atlas IP whitelist updated
• Monitor usage to stay within free tier limits

═══════════════════════════════════════════════════════════════════════════════
COST BREAKDOWN (FREE TIER)
═══════════════════════════════════════════════════════════════════════════════

✓ MongoDB Atlas: FREE (M0 tier - 512MB storage)
✓ Render: FREE (750 hours/month, sleeps after 15 min inactivity)
✓ Vercel: FREE (100GB bandwidth, unlimited deployments)
✓ Domain: Use free subdomain (.vercel.app or .onrender.com)

Total Cost: $0/month 🎉

═══════════════════════════════════════════════════════════════════════════════
QUICK COMMANDS SUMMARY
═══════════════════════════════════════════════════════════════════════════════

# Initialize Git and push to GitHub
cd C:\Users\rishi\OneDrive\Desktop\trial-project
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/academic-roadmap-platform.git
git push -u origin main

# After this, deploy on Render (backend) and Vercel (frontend) using their web interfaces

═══════════════════════════════════════════════════════════════════════════════
NEXT STEPS AFTER DEPLOYMENT
═══════════════════════════════════════════════════════════════════════════════

1. Update README.md with your live link
2. Share the link with users
3. Monitor logs in Render/Vercel dashboards
4. Set up custom domain (optional, costs ~$10/year)
5. Add analytics (Google Analytics - free)

═══════════════════════════════════════════════════════════════════════════════

Need help? Check:
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/

Good luck with your deployment! 🚀

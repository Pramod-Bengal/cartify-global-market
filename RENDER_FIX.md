# Fixing "Not Working in Render" (Connection Refused)

You are seeing `net::ERR_CONNECTION_REFUSED` because your frontend is trying to connect to `http://localhost:9000` (your local computer) instead of your live Render backend.

## Step 1: Deploy Your Backend
Ensure your backend (the `server` folder) is deployed as a **Web Service** on Render.
- If you haven't deployed it yet, deploy it now.
- Copy its **HTTPS URL** (e.g., `https://cartify-server.onrender.com`).

## Step 2: Configure Frontend Service
1. Go to your **Frontend Service** (Static Site) dashboard on Render.
2. Click **Environment**.
3. Edit the `VITE_API_URL` variable.
   - **Current Value:** `http://localhost:9000` (This is WRONG for production!)
   - **New Value:** `https://your-backend-service-name.onrender.com` (Paste your actual backend URL here).
4. **Save Changes**.

## Step 3: Redeploy
1. Click **Manual Deploy** -> **Deploy latest commit** (or "Clear build cache & deploy").
2. Wait for the build to finish.
3. Open your app and try Signing Up again.

## Why this happened?
Your local development setup uses `localhost:9000`. When deploying, you must tell the frontend where the *live* backend lives using Environment Variables. We have updated your code to handle this better, but you MUST update the variable in the Render Dashboard.

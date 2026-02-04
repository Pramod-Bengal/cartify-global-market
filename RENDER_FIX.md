# Fixing "Not Working in Render" (Connection Refused & 404s)

## The Issues
1. `net::ERR_CONNECTION_REFUSED`: Your frontend is trying to connect to `localhost` instead of the live backend.
2. `404 Not Found` on `/login` or `/signup`: Render doesn't know to serve `index.html` for these routes.

---

## Step 1: Deploy Your Backend
Ensure your backend (the `server` folder) is deployed as a **Web Service** on Render.
- If you haven't deployed it yet, deploy it now.
- Copy its **HTTPS URL** (e.g., `https://cartify-server.onrender.com`).

---

## Step 2: Configure Frontend Environment
1. Go to your **Frontend Service** (Static Site) dashboard on Render.
2. Click **Environment**.
3. Edit/Add the `VITE_API_URL` variable.
   - **Current Value:** `http://localhost:9000` (WRONG for production!)
   - **New Value:** `https://your-backend-service-name.onrender.com` (Paste your actual backend URL).
4. **Save Changes**.

---

## Step 3: Fix 404 Routing (Detailed)
This step is critical for fixing the `404 Not Found` error on `/login`.

1. Go to your **Frontend Service** (Static Site) dashboard on Render.
2. Click **Redirects/Rewrites** in the sidebar.
3. Click **Add Rule**.
4. Enter the following:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** `Rewrite`
5. Click **Save Changes**.

---

## Step 4: Redeploy
1. Click **Manual Deploy** -> **Deploy latest commit** (or "Clear build cache & deploy").
2. Wait for the build to finish.
3. Open your app.
   - `/login` should now load correctly.
   - Signing up should connect to the backend without "Connection Refused".

---

## Explanation
- **Routing:** Single Page Apps (React) need all paths to be handled by `index.html`. The "Rewrite" rule tells Render to send everything to `index.html` so React Router can handle it.
- **Connection:** You cannot connect to `localhost` from a deployed site. You must point to the live backend URL.

# Debugging "Connection Closed" or "Server Error" on Render

If you see `net::ERR_CONNECTION_CLOSED` or `500 Internal Server Error`, your Backend Server is likely crashing or failing to start.

## Step 1: Check the Logs (CRITICAL)
1. Go to your **Render Dashboard**.
2. Click on your **Backend Service** (Web Service).
3. Click on the **Logs** tab.
4. Look for **Red Error Messages**.

### Common Errors & Fixes

#### 1. "Mongodb Connection Error" or "MongooseServerSelectionError"
- **Cause**: Your MongoDB Atlas IP Whitelist blocks Render.
- **Fix**: 
  1. Go to MongoDB Atlas -> Network Access.
  2. Add IP Address -> `0.0.0.0/0` (Allow Access from Anywhere).
  3. Wait 1-2 minutes and Redeploy Render.

#### 2. "MISSING ❌" in logs (from our new check)
- **Cause**: You forgot to add Environment Variables in Render.
- **Fix**:
  1. Go to Render -> Backend Service -> **Environment**.
  2. Add these keys:
     - `MONGODB_URI`: (Your full connection string)
     - `JWT_SECRET`: (Any long random string)
     - `MY_SECRET_API_KEY`: (Your secret key)
  3. **Save Changes** (Causes auto-redeploy).

#### 3. "Duplicate key error"
- **Cause**: You are signing up with an email or phone that already exists.
- **Fix**: Use a different email/phone.

---

## Step 2: Verify Health Check
We added a simple health check route.
- Open your Backend URL in a browser (e.g., `https://cartify-server.onrender.com/`).
- You should see: `"API is running successfully!"`
- If you see this, your server is **UP**. The issue might be in the specific `/signup` request.
- If you see "Site can't be reached", your server is **DOWN** (Crashed). See Step 1.

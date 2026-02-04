# Cartify Global Market

## How can I edit this code?

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment to Render

This project consists of a React/Vite frontend and a Node.js/Express backend. Both can be deployed to Render as separate services.

### Backend Deployment (Node.js/Express)

1.  **Prepare your Backend for Deployment:**
    *   Ensure your `server/package.json` has a `start` script defined (e.g., `"start": "node index.js"`).
    *   Identify all environment variables used by your backend (e.g., `MONGODB_URI`, `JWT_SECRET`, `API_KEY`). You will set these in the Render dashboard.

2.  **Create a Git Repository**: Push your backend code to a Git repository (GitHub, GitLab, Bitbucket).

3.  **Create a New Web Service on Render**: 
    *   Go to your Render Dashboard, click "New" -> "Web Service".
    *   Connect your Git repository and select the deployment branch.

4.  **Configure your Web Service**:
    *   **Name**: Choose a descriptive name (e.g., `cartify-backend`).
    *   **Root Directory**: Set this to `server/`.
    *   **Runtime**: Node.js should be auto-detected.
    *   **Build Command**: `npm install` (or `yarn install` if you use Yarn).
    *   **Start Command**: `node index.js`.
    *   **Environment Variables**: Add your backend's environment variables in the Render dashboard's "Environment" section.

5.  **Deploy**: Click "Create Web Service" and monitor the build logs. Render will provide a public URL (e.g., `https://cartify-backend.onrender.com`).

### Frontend Deployment (React/Vite)

1.  **Prepare your Frontend for Deployment:**
    *   **Environment Variables**: If your frontend uses environment variables (e.g., for the backend API URL), you'll need to configure these. For Vite, these typically start with `VITE_` (e.g., `VITE_API_URL`).

2.  **Create a Git Repository**: Push your frontend code to a Git repository.

3.  **Create a New Web Service on Render**: 
    *   Go to your Render Dashboard, click "New" -> "Static Site" (for a frontend-only application).
    *   Connect your Git repository and select the deployment branch.

4.  **Configure your Static Site**:
    *   **Name**: Choose a descriptive name (e.g., `cartify-frontend`).
    *   **Root Directory**: Leave this empty if your `package.json` is at the root. If your frontend is in a subdirectory (e.g., `client/`), set it to that path.
    *   **Build Command**: `npm run build` (or `yarn build`).
    *   **Publish Directory**: `dist` (this is the default output directory for Vite builds).
    *   **Environment Variables**: Add any frontend environment variables (e.g., `VITE_API_URL` pointing to your deployed backend URL).
    *   **Redirects/Rewrites**: **CRITICAL FOR REACT APPS**.
        - Add a Rewrite Rule: Source `/*`, Destination `/index.html`, Action `Rewrite`.
        - Without this, refreshing pages like `/login` will result in 404 errors.

5.  **Deploy**: Click "Create Static Site". Render will build and deploy your frontend, providing a public URL.

### Linking Frontend to Backend & CORS

1.  **Update Frontend API URL**: Once your backend is deployed and you have its Render URL, update your frontend's API calls to use this URL. This is typically done via an environment variable (e.g., `VITE_API_URL`).

2.  **CORS Configuration**: Your Node.js backend likely uses `cors` middleware. You'll need to configure it to allow requests from your deployed frontend's URL. In your `server/index.js` or a dedicated CORS configuration file, you might have something like:

    ```javascript
    // ... existing code ...
    const express = require('express');
    const cors = require('cors');
    const app = express();

    // Configure CORS to allow requests from your frontend's Render URL
    app.use(cors({
      origin: 'https://your-frontend-service.onrender.com', // Replace with your actual frontend Render URL
      credentials: true
    }));

    // ... existing code ...
    ```

    Make sure to use the exact URL provided by Render for your frontend. You can also make the origin dynamic using an environment variable.

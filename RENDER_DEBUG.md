# Troubleshooting Render Errors

## Error: `400 Bad Request`
This means the server **received** your request but **rejected** it. It is NOT a deployment or connection issue.
It is usually caused by:
1.  **User Already Exists**: You are trying to Sign Up with an email or phone that is already in the database.
2.  **Invalid Data**:
    - **Phone Number**: Must be exactly 10 digits. (We just added code to auto-fix dashes/spaces).
    - **Password**: Must be at least 8 characters.
    - **Email**: Must be a valid email format.

### Solution
- Check the **Red Text** on your Signup Debug screen (if applicable).
- Try a **Different Email** and **Different Phone Number**.

---

## Error: `net::ERR_CONNECTION_CLOSED` or `500 Server Error`
This means the server **Crashed**.
1.  **Check Logs**: Go to Render Dashboard -> Logs.
2.  **Missing Env Vars**: Did you add `MONGODB_URI`, `JWT_SECRET`, and `MY_SECRET_API_KEY`?
3.  **MongoDB Access**: Did you whitelist `0.0.0.0/0` in MongoDB Atlas?

---

## Error: `404 Not Found` (on Refresh)
This is a routing issue.
- Ensure you added the **Rewrite Rule** in Render:
  - Source: `/*`
  - Destination: `/index.html`
  - Action: `Rewrite`

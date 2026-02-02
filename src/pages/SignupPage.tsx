import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from './SignupPage.module.css';

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    setSuccess("");
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": (import.meta.env.VITE_API_KEY as string) || "cartify123",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setError("");
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => {
          if (redirect) {
            navigate(`/login?redirect=${encodeURIComponent(redirect)}`);
          } else {
            navigate("/login");
          }
        }, 2000);
      } else {
        setError(data.message || data.error || "Signup failed");
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className={`${styles['signup-page']} flex items-center justify-center min-h-screen`}>
      <div className={`${styles['signup-card']} w-full max-w-md p-8 space-y-6 text-gray-800`}>
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-800">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-200 text-gray-800 placeholder-gray-500"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-800">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-200 text-gray-800 placeholder-gray-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-800">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-200 text-gray-800 placeholder-gray-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-800">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-200 text-gray-800 placeholder-gray-500"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-800">
          Already have an account?{' '}
          <Link to={`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage; 
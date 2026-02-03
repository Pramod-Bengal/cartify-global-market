import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// Removed import { Mail, Lock } from 'lucide-react';
import styles from './LoginPage.module.css';
import { API_KEY, getApiUrl } from "../config";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(getApiUrl('/api/auth/login'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.status === "success") {
        // Optionally store token: localStorage.setItem("token", data.token);
        localStorage.setItem('cartify_token', data.token);
        localStorage.setItem('cartify_user', JSON.stringify(data.user));
        navigate(redirect);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className={`${styles['login-page']} flex items-center justify-center min-h-screen bg-slate-950`}>
      <div className={`${styles['login-card']} w-full max-w-md p-8 space-y-6 bg-slate-900 border border-slate-800 rounded-lg shadow-xl text-white`}>
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-slate-700 rounded bg-slate-950 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-slate-700 rounded bg-slate-950 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Don't have an account?{' '}
          <Link to={`/signup${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 
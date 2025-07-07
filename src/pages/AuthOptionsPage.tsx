import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthOptionsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect') || '';
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow max-w-sm w-full flex flex-col gap-6 items-center">
        <h2 className="text-2xl font-bold mb-4">Please Login or Create an Account</h2>
        <button
          className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 mb-2"
          onClick={() => navigate(`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`)}
        >
          Login
        </button>
        <button
          className="w-full py-2 font-semibold text-white bg-orange-500 rounded hover:bg-orange-600"
          onClick={() => navigate(`/signup${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`)}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default AuthOptionsPage; 
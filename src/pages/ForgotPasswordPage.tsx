import React from 'react';

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <p className="text-center">Enter your email to receive a password reset link.</p>
        {/* You can add a form for email input here */}
        <button
          onClick={() => alert('Password reset link sent!')}
          className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

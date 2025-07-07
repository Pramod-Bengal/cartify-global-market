import React, { useState, useEffect } from "react";

// Get userId from localStorage if available
let USER_ID = "";
try {
  const userStr = localStorage.getItem('cartify_user');
  if (userStr) {
    const user = JSON.parse(userStr);
    USER_ID = user._id || "";
  }
} catch {}

const AccountPage = () => {
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingMobile, setEditingMobile] = useState(false);
  const [emailInput, setEmailInput] = useState(email);
  const [mobileInput, setMobileInput] = useState(mobile);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Load user data from backend on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('cartify_token');
        const res = await fetch('http://localhost:9000/api/user/me', {
          headers: {
            'x-api-key': 'cartify123',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });
        const data = await res.json();
        if (data.status === 'success') {
          setEmail(data.user.email || "");
          setMobile(data.user.phone || "");
          setGender(data.user.gender || "");
        }
      } catch {}
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    setSuccess("");
    setError("");
    try {
      const token = localStorage.getItem('cartify_token');
      const res = await fetch("http://localhost:9000/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "cartify123",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          email,
          phone: mobile,
          gender
        })
      });
      const data = await res.json();
      if (data.status === "success") {
        setSuccess("Personal information updated!");
      } else {
        if (data.message === "The user belonging to this token no longer exists.") {
          localStorage.removeItem('cartify_token');
          localStorage.removeItem('cartify_user');
          window.location.href = '/login';
          return;
        }
        setError(data.message || "Failed to update info");
      }
    } catch (err) {
      setError("Failed to update info");
    }
  };

  const handleEmailSave = () => {
    setEmail(emailInput);
    setEditingEmail(false);
  };
  const handleMobileSave = () => {
    setMobile(mobileInput);
    setEditingMobile(false);
  };
  const handleGenderChange = (g: string) => {
    setGender(g);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded shadow mt-4 sm:mt-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Personal Information</h2>
      {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <div className="mb-3 sm:mb-4">
        <div className="font-semibold mb-1 sm:mb-2">Your Gender</div>
        <label className="mr-4">
          <input type="radio" name="gender" value="Male" checked={gender === "Male"} onChange={() => handleGenderChange("Male")} /> Male
        </label>
        <label>
          <input type="radio" name="gender" value="Female" checked={gender === "Female"} onChange={() => handleGenderChange("Female")} /> Female
        </label>
      </div>
      <div className="mb-3 sm:mb-4">
        <div className="font-semibold mb-1 sm:mb-2">Email Address <span className="text-blue-600 text-sm font-normal cursor-pointer" onClick={() => setEditingEmail(true)}>Edit</span></div>
        {editingEmail ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <input className="border px-2 py-1 rounded w-full sm:w-auto" value={emailInput} onChange={e => setEmailInput(e.target.value)} />
            <button className="bg-blue-600 text-white px-3 py-1 rounded w-full sm:w-auto" onClick={handleEmailSave}>Save</button>
            <button className="text-gray-500 px-2 w-full sm:w-auto" onClick={() => setEditingEmail(false)}>Cancel</button>
          </div>
        ) : (
          <div>{email}</div>
        )}
      </div>
      <div className="mb-3 sm:mb-4">
        <div className="font-semibold mb-1 sm:mb-2">Mobile Number <span className="text-blue-600 text-sm font-normal cursor-pointer" onClick={() => setEditingMobile(true)}>Edit</span></div>
        {editingMobile ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <input className="border px-2 py-1 rounded w-full sm:w-auto" value={mobileInput} onChange={e => setMobileInput(e.target.value)} />
            <button className="bg-blue-600 text-white px-3 py-1 rounded w-full sm:w-auto" onClick={handleMobileSave}>Save</button>
            <button className="text-gray-500 px-2 w-full sm:w-auto" onClick={() => setEditingMobile(false)}>Cancel</button>
          </div>
        ) : (
          <div>{mobile}</div>
        )}
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">FAQs</h3>
        <ul className="list-disc pl-6 text-gray-700 text-xs sm:text-sm space-y-2">
          <li>What happens when I update my email address (or mobile number)?<br /><span className="text-gray-500">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</span></li>
          <li>When will my Flipkart account be updated with the new email address (or mobile number)?<br /><span className="text-gray-500">It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</span></li>
          <li>What happens to my existing Flipkart account when I update my email address (or mobile number)?<br /><span className="text-gray-500">Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</span></li>
          <li>Does my Seller account get affected when I update my email address?<br /><span className="text-gray-500">Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</span></li>
        </ul>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AccountPage; 
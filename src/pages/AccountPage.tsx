import React, { useState } from "react";

const AccountPage = () => {
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("pramod@gmail.com"); // Example email
  const [mobile, setMobile] = useState("+919632651044"); // Example mobile
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingMobile, setEditingMobile] = useState(false);
  const [emailInput, setEmailInput] = useState(email);
  const [mobileInput, setMobileInput] = useState(mobile);

  const handleEmailSave = () => {
    setEmail(emailInput);
    setEditingEmail(false);
  };
  const handleMobileSave = () => {
    setMobile(mobileInput);
    setEditingMobile(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Personal Information <span className="text-blue-600 text-sm font-normal ml-2">Edit</span></h2>
      <div className="mb-4">
        <div className="font-semibold mb-2">Your Gender</div>
        <label className="mr-4">
          <input type="radio" name="gender" value="Male" checked={gender === "Male"} onChange={() => setGender("Male")} /> Male
        </label>
        <label>
          <input type="radio" name="gender" value="Female" checked={gender === "Female"} onChange={() => setGender("Female")} /> Female
        </label>
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-2">Email Address <span className="text-blue-600 text-sm font-normal cursor-pointer" onClick={() => setEditingEmail(true)}>Edit</span></div>
        {editingEmail ? (
          <div className="flex gap-2">
            <input className="border px-2 py-1 rounded" value={emailInput} onChange={e => setEmailInput(e.target.value)} />
            <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={handleEmailSave}>Save</button>
            <button className="text-gray-500 px-2" onClick={() => setEditingEmail(false)}>Cancel</button>
          </div>
        ) : (
          <div>{email}</div>
        )}
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-2">Mobile Number <span className="text-blue-600 text-sm font-normal cursor-pointer" onClick={() => setEditingMobile(true)}>Edit</span></div>
        {editingMobile ? (
          <div className="flex gap-2">
            <input className="border px-2 py-1 rounded" value={mobileInput} onChange={e => setMobileInput(e.target.value)} />
            <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={handleMobileSave}>Save</button>
            <button className="text-gray-500 px-2" onClick={() => setEditingMobile(false)}>Cancel</button>
          </div>
        ) : (
          <div>{mobile}</div>
        )}
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">FAQs</h3>
        <ul className="list-disc pl-6 text-gray-700 text-sm space-y-2">
          <li>What happens when I update my email address (or mobile number)?<br /><span className="text-gray-500">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</span></li>
          <li>When will my Flipkart account be updated with the new email address (or mobile number)?<br /><span className="text-gray-500">It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</span></li>
          <li>What happens to my existing Flipkart account when I update my email address (or mobile number)?<br /><span className="text-gray-500">Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</span></li>
          <li>Does my Seller account get affected when I update my email address?<br /><span className="text-gray-500">Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</span></li>
        </ul>
      </div>
      <div className="flex gap-4">
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Deactivate Account</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete Account</button>
      </div>
    </div>
  );
};

export default AccountPage; 
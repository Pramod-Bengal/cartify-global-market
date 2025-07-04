import React, { useState } from "react";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const DeliveryAddressPage = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "Home"
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const res = await fetch("http://localhost:9000/api/address/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "cartify123"
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.status === "success") {
        setSuccess("Address saved successfully!");
        setForm({
          name: "",
          mobile: "",
          pincode: "",
          locality: "",
          address: "",
          city: "",
          state: "",
          landmark: "",
          alternatePhone: "",
          addressType: "Home"
        });
      } else {
        setError(data.message || "Failed to save address");
      }
    } catch (err) {
      setError("Failed to save address");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>
        {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <input name="name" value={form.name} onChange={handleChange} type="text" className="w-1/2 px-3 py-2 border rounded" placeholder="Name" required />
            <input name="mobile" value={form.mobile} onChange={handleChange} type="text" className="w-1/2 px-3 py-2 border rounded" placeholder="10-digit mobile number" required />
          </div>
          <div className="flex gap-4">
            <input name="pincode" value={form.pincode} onChange={handleChange} type="text" className="w-1/2 px-3 py-2 border rounded" placeholder="Pincode" required />
            <input name="locality" value={form.locality} onChange={handleChange} type="text" className="w-1/2 px-3 py-2 border rounded" placeholder="Locality" required />
          </div>
          <input name="address" value={form.address} onChange={handleChange} type="text" className="w-full px-3 py-2 border rounded" placeholder="Address (Area and Street)" required />
          <div className="flex gap-4">
            <input name="city" value={form.city} onChange={handleChange} type="text" className="w-1/2 px-3 py-2 border rounded" placeholder="City/District/Town" required />
            <select name="state" value={form.state} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded" required >
              <option value="" disabled>--Select State--</option>
              {states.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>
          <div className="flex gap-4">
            <input name="landmark" value={form.landmark} onChange={handleChange} type="text" className="w-1/2 px-3 py-2 border rounded" placeholder="Landmark (Optional)" />
            <input name="alternatePhone" value={form.alternatePhone} onChange={handleChange} type="text" className="w-1/2 px-3 py-2 border rounded" placeholder="Alternate Phone (Optional)" />
          </div>
          <div className="flex gap-8 items-center">
            <label className="flex items-center gap-2">
              <input type="radio" name="addressType" value="Home" checked={form.addressType === "Home"} onChange={handleChange} />
              Home (All day delivery)
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="addressType" value="Work" checked={form.addressType === "Work"} onChange={handleChange} />
              Work (Delivery between 10 AM - 5 PM)
            </label>
          </div>
          <button type="submit" className="w-full py-2 font-semibold text-white bg-orange-500 rounded hover:bg-orange-600 mt-2">SAVE AND DELIVER HERE</button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryAddressPage; 
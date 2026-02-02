import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const DeliveryAddressPage = () => {
  const navigate = useNavigate();
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
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/address/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": (import.meta.env.VITE_API_KEY as string) || "cartify123",
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.status === "success") {
        toast({
          title: "Address Saved!",
          description: "Your delivery address has been saved successfully.",
          variant: "success", // assuming a 'success' variant is available or default works
        });
        // Removed setTimeout(() => {
        //   navigate('/checkout');
        // }, 1000);
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
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl p-4 sm:p-8 space-y-4 sm:space-y-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Delivery Address</h2>
        {/* {success && <div className="text-green-600 text-sm mb-2">{success}</div>} */}
        {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input name="name" value={form.name} onChange={handleChange} type="text" className="w-full sm:w-1/2 px-3 py-2 border rounded bg-gray-700 text-white placeholder-gray-400 font-bold" placeholder="Name" required />
            <input name="mobile" value={form.mobile} onChange={handleChange} type="text" className="w-full sm:w-1/2 px-3 py-2 border rounded bg-gray-700 text-white placeholder-gray-400 font-bold" placeholder="10-digit mobile number" required />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <input name="pincode" value={form.pincode} onChange={handleChange} type="text" className="w-full sm:w-1/2 px-3 py-2 border rounded bg-gray-700 text-white placeholder-gray-400 font-bold" placeholder="Pincode" required />
            <input name="locality" value={form.locality} onChange={handleChange} type="text" className="w-full sm:w-1/2 px-3 py-2 border rounded bg-gray-700 text-white placeholder-gray-400 font-bold" placeholder="Locality" required />
          </div>
          <input name="address" value={form.address} onChange={handleChange} type="text" className="w-full px-3 py-2 border rounded bg-gray-700 text-white placeholder-gray-400 font-bold" placeholder="Address (Area and Street)" required />
          <div className="flex flex-col sm:flex-row gap-4">
            <input name="city" value={form.city} onChange={handleChange} type="text" className="w-full sm:w-1/2 px-3 py-2 border rounded bg-gray-700 text-white placeholder-gray-400 font-bold" placeholder="City/District/Town" required />
            <select name="state" value={form.state} onChange={handleChange} className="w-full sm:w-1/2 px-3 py-2 border rounded bg-gray-700 text-white placeholder-gray-400 font-bold" required >
              <option value="" disabled>--Select State--</option>
              {states.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <input name="landmark" value={form.landmark} onChange={handleChange} type="text" className="w-full sm:w-1/2 px-3 py-2 border rounded bg-gray-700 text-white placeholder-gray-400 font-bold" placeholder="Landmark (Optional)" />
            <input name="alternatePhone" value={form.alternatePhone} onChange={handleChange} type="text" className="w-full sm:w-1/2 px-3 py-2 border rounded bg-gray-700 text-white placeholder-gray-400 font-bold" placeholder="Alternate Phone (Optional)" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center text-gray-800">
            <label className="flex items-center gap-2 font-bold">
              <input type="radio" name="addressType" value="Home" checked={form.addressType === "Home"} onChange={handleChange} className="form-radio text-blue-600 bg-gray-700 border-gray-600" />
              Home (All day delivery)
            </label>
            <label className="flex items-center gap-2 font-bold">
              <input type="radio" name="addressType" value="Work" checked={form.addressType === "Work"} onChange={handleChange} className="form-radio text-blue-600 bg-gray-700 border-gray-600" />
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
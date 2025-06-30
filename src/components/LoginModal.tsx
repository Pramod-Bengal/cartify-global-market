import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const countryCodes = [
  { code: '+91', label: 'India' },
  { code: '+1', label: 'USA' },
  { code: '+44', label: 'UK' },
  // Add more as needed
];

const LoginModal = ({ open, onClose, onLoginSuccess }: LoginModalProps) => {
  const [useEmail, setUseEmail] = useState(false);
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validate = (val: string) => {
    if (useEmail) {
      // Simple email regex
      return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
    } else {
      // Simple phone validation (10 digits)
      return /^\d{10}$/.test(val);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (useEmail) {
      setEmail(val);
      setIsValid(validate(val));
    } else {
      setPhone(val);
      setIsValid(validate(val));
    }
  };

  const handleContinue = () => {
    if (isValid) {
      onLoginSuccess();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-2">Log in to complete your shopping</h2>
        <p className="text-gray-500 mb-6">Shop and track your orders easily</p>
        <form onSubmit={e => { e.preventDefault(); handleContinue(); }}>
          {!useEmail ? (
            <div className="flex items-center border rounded mb-2 overflow-hidden">
              <select
                className="bg-gray-100 px-2 py-3 outline-none"
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
              >
                {countryCodes.map(c => (
                  <option key={c.code} value={c.code}>{c.code}</option>
                ))}
              </select>
              <Input
                className="flex-1 border-0 focus:ring-0 px-3 py-3"
                placeholder="Phone Number"
                value={phone}
                onChange={handleInput}
                maxLength={10}
                type="tel"
                required
              />
            </div>
          ) : (
            <Input
              className="mb-2 px-3 py-3"
              placeholder="Email ID"
              value={email}
              onChange={handleInput}
              type="email"
              required
            />
          )}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              className="text-blue-600 text-sm font-medium hover:underline"
              onClick={() => setUseEmail(!useEmail)}
            >
              {useEmail ? 'Use Phone Number' : 'Use Email-ID'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            By continuing, you confirm that you are above 18 years of age, and you agree to the Cartify's <a href="#" className="text-blue-600 underline">Terms of Use</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
          </p>
          <Button
            type="submit"
            className="w-full bg-gray-300 text-gray-600"
            style={{ backgroundColor: isValid ? '#f97316' : '#e5e7eb', color: isValid ? '#fff' : '#6b7280' }}
            disabled={!isValid}
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal; 
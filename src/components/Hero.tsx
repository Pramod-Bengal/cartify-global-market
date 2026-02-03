import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onShopNow?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  // const navigate = useNavigate();

  const handleShopNow = () => {
    if (onShopNow) {
      onShopNow();
    }
    // else {
    //   navigate('/address');
    // }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation: 10 digit number
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    // TODO: Handle mobile number submission (e.g., send to backend)
    setOpen(false);
    setMobile('');
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-800 to-blue-600 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Shop the Best
              <span className="text-orange-400"> Deals</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100">
              Discover thousands of products at unbeatable prices with fast delivery and easy returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleShopNow} className="mt-6 px-8 py-3 text-lg font-semibold rounded bg-orange-500 hover:bg-orange-600">
                Shop Now
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
              <img
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop"
                alt="Shopping"
                className="rounded-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Mobile Number</DialogTitle>
            <DialogDescription>
              Please provide your contact number to begin shopping.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="tel"
              className="w-full px-3 py-2 border rounded"
              placeholder="Mobile Number"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              maxLength={10}
              required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="w-full bg-blue-600 text-white">Continue</Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;

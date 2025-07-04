import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DeliveryAddressPage from "./pages/DeliveryAddressPage";
import AccountPage from "./pages/AccountPage";

// Placeholder components for missing pages
const SuperCoinZone = () => <div>SuperCoin Zone</div>;
const CartifyPlusZone = () => <div>Cartify Plus Zone</div>;
const AllCategories = () => <div>All Categories</div>;
const MoreOnCartify = () => <div>More on Cartify</div>;
const ChooseLanguage = () => <div>Choose Language</div>;
const OfferZone = () => <div>Offer Zone</div>;
const SellOnCartify = () => <div>Sell on Cartify</div>;
const MyOrders = () => <div>My Orders</div>;
const Coupons = () => <div>Coupons</div>;
const MyCart = () => <div>My Cart</div>;
const MyWishlist = () => <div>My Wishlist</div>;
const MyAccount = () => <div>My Account</div>;
const MyNotifications = () => <div>My Notifications</div>;
const NotificationPreferences = () => <div>Notification Preferences</div>;
const HelpCentre = () => <div>Help Centre</div>;
const Legal = () => <div>Legal</div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/supercoin-zone" element={<SuperCoinZone />} />
          <Route path="/cartify-plus-zone" element={<CartifyPlusZone />} />
          <Route path="/all-categories" element={<AllCategories />} />
          <Route path="/more-on-cartify" element={<MoreOnCartify />} />
          <Route path="/choose-language" element={<ChooseLanguage />} />
          <Route path="/offer-zone" element={<OfferZone />} />
          <Route path="/sell-on-cartify" element={<SellOnCartify />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/my-wishlist" element={<MyWishlist />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-notifications" element={<MyNotifications />} />
          <Route path="/notification-preferences" element={<NotificationPreferences />} />
          <Route path="/help-centre" element={<HelpCentre />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/address" element={<DeliveryAddressPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

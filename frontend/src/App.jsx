// src/App.jsx
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";

import SweetShop from "./pages/SweetShop";
import AddSweet from "./pages/AddSweet";
import EditSweet from "./pages/EditSweet";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import PurchaseAnalytics from "./pages/PurchaseAnalytics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const [showLogin, setShowLogin] = useState(false); // popup only
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setShowLogin(false);
    navigate("/sweet-shop");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onLogin={() => setShowLogin(true)}
        onSignup={() => setShowSignup(true)}
      />

      <main>
        <Routes>
          <Route path="/" element={<SweetShop />} />
          <Route path="/sweet-shop" element={<SweetShop />} />
          <Route path="/sweet-shop/add" element={<AddSweet />} />
          <Route path="/sweet-shop/edit/:id" element={<EditSweet />} />

          {/* FULL PAGES */}
          <Route
            path="/login"
            element={
              <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
                <Login
                  onSuccess={handleLoginSuccess}
                  onSignup={() => navigate("/signup")}
                />
              </div>
            }
          />

          <Route
            path="/signup"
            element={
              <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
                <Signup
                  onSuccess={() => navigate("/login")}
                  onLogin={() => navigate("/login")}
                />
              </div>
            }
          />

          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/analytics" element={<PurchaseAnalytics />} />
        </Routes>
      </main>

      {/* POPUP LOGIN */}
      {showLogin && (
        <div className="fixed inset-0 bg-white z-50 flex justify-center items-center p-6">
          <button
            onClick={() => setShowLogin(false)}
            className="absolute top-5 right-5 text-2xl text-gray-500 hover:text-black"
          >
            ✖
          </button>
          <Login
            onSuccess={handleLoginSuccess}
            onSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />
        </div>
      )}

      {/* POPUP SIGNUP */}
      {showSignup && (
        <div className="fixed inset-0 bg-white z-50 flex justify-center items-center p-6">
          <button
            onClick={() => setShowSignup(false)}
            className="absolute top-5 right-5 text-2xl text-gray-500"
          >
            ✖
          </button>
          <Signup
            onSuccess={() => setShowSignup(false)}
            onLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        </div>
      )}
    </div>
  );
}

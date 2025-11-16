// src/App.jsx
import { Routes, Route } from "react-router-dom";
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
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  const openSignup = () => setShowSignup(true);
  const closeSignup = () => setShowSignup(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLogin={openLogin} onSignup={openSignup} />

      <main>
        <Routes>
          <Route path="/" element={<SweetShop />} />
          <Route
            path="/login"
            element={
              <div className="flex items-center justify-center w-full min-h-screen p-6 bg-gray-50">
                <div className="w-full max-w-md">
                  <Login
                    onSuccess={closeLogin}
                    onSignup={() => {
                      closeLogin();
                      openSignup();
                    }}
                  />
                </div>
              </div>
            }
          />

          <Route path="/sweet-shop" element={<SweetShop />} />
          <Route path="/sweet-shop/add" element={<AddSweet />} />
          <Route path="/sweet-shop/edit/:id" element={<EditSweet />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/analytics" element={<PurchaseAnalytics />} />
        </Routes>
      </main>

      {/* FULL-PAGE LOGIN POPUP */}
      {showLogin && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <button
            onClick={closeLogin}
            className="absolute top-5 right-5 text-2xl text-gray-500 hover:text-black"
          >
            ✖
          </button>

          <div className="flex justify-center items-center min-h-screen p-6">
            <Login
              onSuccess={closeLogin}
              onSignup={() => {
                closeLogin();
                openSignup();
              }}
            />
          </div>
        </div>
      )}

      {/* FULL-PAGE SIGNUP POPUP */}
      {showSignup && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <button
            onClick={closeSignup}
            className="absolute top-5 right-5 text-2xl text-gray-500 hover:text-black"
          >
            ✖
          </button>

          <div className="flex items-center justify-center min-h-screen p-6">
            <Signup
              onSuccess={closeSignup}
              onLogin={() => {
                closeSignup();
                openLogin();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

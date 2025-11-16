import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar({ onLogin, onSignup }) {
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();  // Refresh UI
  };

  return (
    <nav className="w-full px-8 py-4 bg-white shadow-md flex justify-between items-center">
      <Logo />

      <div className="flex gap-6 text-gray-700 font-medium items-center">
        <NavLink to="/sweet-shop" className="hover:text-pink-600">
          Sweet Shop
        </NavLink>

        <NavLink to="/sweet-shop/add" className="hover:text-pink-600">
          Add Sweet
        </NavLink>

        <NavLink to="/profile" className="hover:text-pink-600">
          Profile
        </NavLink>

        {/* If NOT logged in → Show Login / Signup */}
        {!isLoggedIn && (
          <>
            <button onClick={onLogin} className="hover:text-pink-600">
              Login
            </button>

            <button onClick={onSignup} className="hover:text-pink-600">
              Signup
            </button>
          </>
        )}

        {/* If logged in → Show Logout */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

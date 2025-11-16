import { useEffect, useState } from "react";
import API from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    // No token → force login popup via redirect event
    if (!token) {
      setErr("Please login to view your profile.");
      return;
    }

    API.get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        setErr("Session expired. Please login again.");
        localStorage.removeItem("token");
      });
  }, []);

  // If session error
  if (err)
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-red-600">{err}</h2>
        <p className="text-gray-600 mt-3">Redirecting to login...</p>

        {/* Trigger login popup in App.jsx */}
        {setTimeout(() => {
          window.dispatchEvent(new CustomEvent("open-login"));
          window.location.href = "/";
        }, 1000)}
      </div>
    );

  // Waiting for API
  if (!user)
    return <div className="p-10 text-center text-gray-700">Loading your profile...</div>;

  return (
    <section className="px-8 py-10 max-w-xl mx-auto">
      <div className="bg-white p-8 shadow-lg rounded-2xl border">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-pink-600 text-white flex items-center justify-center text-3xl font-bold shadow">
            {user.name[0]}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          className="mt-6 w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/"; // Fix logout redirect
          }}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

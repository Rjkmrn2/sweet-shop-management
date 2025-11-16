import { useEffect, useState } from "react";
import API from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => setUser(res.data))
      .catch((error) => {
        console.log("Profile fetch error:", error);
        setErr("Unable to load profile. Please login again.");
      });
  }, []);

  if (err)
    return (
      <div className="p-8 text-center text-red-600 text-lg">
        {err}
      </div>
    );

  if (!user)
    return <div className="p-8 text-center">Loading...</div>;

  return (
    <section className="px-8 py-10 max-w-xl mx-auto">
      <div className="bg-white p-8 shadow-lg rounded-2xl border">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-pink-600 text-white flex items-center justify-center text-3xl font-bold shadow">
            {user.name[0]}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <button
          className="mt-6 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

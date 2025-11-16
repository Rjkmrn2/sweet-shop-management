import { useState } from "react";
import API from "../api";

export default function Login({ onSuccess, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onSuccess?.(); // close popup
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>

      <form onSubmit={submit} className="flex flex-col gap-4">
        
        <input
          className="border px-4 py-3 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border px-4 py-3 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {err && <p className="text-red-500 text-sm">{err}</p>}

        <button className="bg-pink-600 text-white w-full py-3 rounded-lg font-medium text-lg hover:bg-pink-700 transition">
          Login
        </button>
      </form>

      <p className="text-center text-sm mt-6 text-gray-600">
        Don’t have an account?{" "}
        <button
          onClick={onSignup}
          className="text-pink-600 font-medium hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}

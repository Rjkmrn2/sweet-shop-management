import { useState } from "react";
import API from "../api";

export default function Signup({ onSuccess, onLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    try {
      const res = await API.post("/auth/signup", form);
      setMsg(res.data.message || "Account created!");

      // Close popup after success
      setTimeout(() => {
        onSuccess?.();
      }, 600);
    } catch (error) {
      setErr(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

      <form onSubmit={submit} className="flex flex-col gap-4">

        <input
          className="border px-4 py-3 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border px-4 py-3 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Email Address"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border px-4 py-3 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {err && <p className="text-red-500 text-sm">{err}</p>}
        {msg && <p className="text-green-600 text-sm">{msg}</p>}

        <button className="bg-pink-600 text-white w-full py-3 rounded-lg font-medium text-lg hover:bg-pink-700 transition">
          Sign Up
        </button>
      </form>

      <p className="text-center text-sm mt-6 text-gray-600">
        Already have an account?{" "}
        <button
          onClick={onLogin}
          className="text-pink-600 font-medium hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
}

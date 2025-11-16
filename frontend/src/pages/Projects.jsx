import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!email || !password) return setErr("Email and password are required.");
    try {
      const res = await API.post("/auth/login", { email, password }); // adjust backend route if different
      // store token if returned
      if (res.data.token) localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign in to SweetX</h1>
        <form className="flex flex-col gap-4" onSubmit={submit}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-300"/>
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-300"/>
          {err && <p className="text-red-500 text-sm">{err}</p>}
          <button className="mt-2 bg-pink-600 text-white py-2 rounded-lg">Login</button>
        </form>
        <p className="text-sm text-center mt-4">Don't have an account? <Link to="/signup" className="text-pink-600 font-medium">Sign up</Link></p>
      </div>
    </div>
  );
}

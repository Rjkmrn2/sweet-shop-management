import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AddSweet() {
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.price) {
      setError("All fields are required.");
      return;
    }

    try {
      await API.post("/sweets", form);
      navigate("/sweet-shop");
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <section className="px-8 py-10 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Add Sweet</h2>
      <form className="bg-white p-6 shadow rounded-xl flex flex-col gap-4" onSubmit={submit}>
        <input
          type="text"
          placeholder="Sweet Name"
          className="px-4 py-2 border rounded-lg"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="px-4 py-2 border rounded-lg"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          className="px-4 py-2 border rounded-lg"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="px-6 py-3 bg-pink-600 text-white rounded-xl">
          Add Sweet
        </button>
      </form>
    </section>
  );
}

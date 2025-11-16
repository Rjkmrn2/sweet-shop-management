import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

export default function EditSweet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    API.get(`/sweets/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await API.put(`/sweets/${id}`, form);
    navigate("/sweet-shop");
  };

  return (
    <section className="max-w-xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Edit Sweet</h2>

      <form onSubmit={submit} className="bg-white p-6 shadow rounded-xl flex flex-col gap-4">
        <input
          type="text"
          className="px-4 py-2 border rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          className="px-4 py-2 border rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="number"
          className="px-4 py-2 border rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <button className="px-6 py-3 bg-pink-600 text-white rounded-xl">
          Save Changes
        </button>
      </form>
    </section>
  );
}

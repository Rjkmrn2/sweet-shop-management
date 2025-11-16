import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function AdminDashboard() {
  const [sweets, setSweets] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    const res = await API.get("/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    API.get("/auth/me").catch(() => navigate("/"));
    load();
  }, []);

  const total = sweets.length;
  const sold = sweets.reduce((a, b) => a + (b.sold || 0), 0);
  const revenue = sweets.reduce((a, b) => a + (b.sold || 0) * (b.price || 0), 0);

  const handleDelete = async (id) => {
    await API.delete(`/sweets/${id}`);
    load();
  };

  return (
    <section className="px-8 py-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 shadow rounded-xl">
          <p className="text-gray-500 text-sm">Total Sweets</p>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <p className="text-gray-500 text-sm">Total Sold</p>
          <p className="text-3xl font-bold">{sold}</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <p className="text-gray-500 text-sm">Revenue</p>
          <p className="text-3xl font-bold">₹{revenue}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="py-3 text-left px-4">Name</th>
              <th className="py-3 text-left px-4">Price</th>
              <th className="py-3 text-left px-4">Sold</th>
              <th className="py-3 text-left px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sweets.map((s) => (
              <tr key={s._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{s.name}</td>
                <td className="py-3 px-4">₹{s.price}</td>
                <td className="py-3 px-4">{s.sold || 0}</td>

                <td className="py-3 px-4 flex gap-2">
                  {/* EDIT BUTTON */}
                  <Link
                    to={`/sweet-shop/edit/${s._id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

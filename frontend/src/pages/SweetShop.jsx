import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function SweetShop() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const navigate=useNavigate()
  useEffect(()=>{
    const token=localStorage.getItem("token")
    console.log(token)
    if(!token){
      navigate("/login")
    }
  },[])
  const load = async () => {
    const res = await API.get("/sweets");
    setSweets(res.data);
  };

  useEffect(() => { load(); }, []);

  const filtered = sweets.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    await API.delete(`/sweets/${id}`);
    load();
  };

  const handlePurchase = async (id) => {
    await API.post(`/sweets/purchase/${id}`);
    load();
  };

  return (
    <section className="px-8 py-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Sweet Shop</h2>
        <Link
          to="/sweet-shop/add"
          className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700"
        >
          Add Sweet
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search sweets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg shadow-sm mb-6"
      />

      {/* Sweet List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((s) => (
          <div key={s._id} className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-xl font-semibold">{s.name}</h3>
            <p className="text-gray-600">{s.description}</p>
            <p className="text-pink-600 font-bold mt-2">₹{s.price}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handlePurchase(s._id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Purchase
              </button>

              <Link
                to={`/sweet-shop/edit/${s._id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(s._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No sweets found.
        </p>
      )}
    </section>
  );
}

import { useEffect, useState } from "react";
import API from "../api";

export default function PurchaseAnalytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/sweets").then((res) => setData(res.data));
  }, []);

  const max = Math.max(...data.map((d) => d.sold || 0), 1);

  return (
    <section className="px-8 py-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Purchase Analytics</h2>

      <div className="bg-white p-6 rounded-xl shadow">
        {data.length === 0 && <p>No data available.</p>}

        {data.map((item) => (
          <div key={item._id} className="mb-4">
            <div className="flex justify-between mb-1">
              <p className="text-gray-700 font-medium">{item.name}</p>
              <span className="text-gray-600">{item.sold || 0}</span>
            </div>

            <div className="w-full bg-gray-200 h-4 rounded-xl overflow-hidden">
              <div
                style={{ width: `${((item.sold || 0) / max) * 100}%` }}
                className="h-full bg-pink-600 rounded-xl"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

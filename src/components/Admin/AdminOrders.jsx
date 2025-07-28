// src/components/AdminOrders.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { FileText } from "lucide-react";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from("orders").select("*").order("id", { ascending: false });
    if (error) toast.error("Gagal ambil data: " + error.message);
    else setOrders(data || []);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-rose-700 mb-4 flex items-center gap-2">
        <FileText size={20} /> Daftar Pembelian
      </h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">Belum ada pesanan masuk.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 space-y-1">
              <p><strong>Nama:</strong> {order.nama}</p>
              <p><strong>Alamat:</strong> {order.alamat}</p>
              <p><strong>Metode:</strong> {order.metode}</p>
              <p><strong>Waktu:</strong> {new Date(order.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;

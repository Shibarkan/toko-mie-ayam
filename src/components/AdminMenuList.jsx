// src/components/AdminMenuList.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import toast from "react-hot-toast";
import { List } from "lucide-react";

const AdminMenuList = () => {
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const { data, error } = await supabase.from("menu").select("*").order("id", { ascending: false });
    if (error) toast.error("Gagal ambil menu: " + error.message);
    else setMenuList(data);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-rose-700 mb-4 flex items-center gap-2">
        <List size={20} /> Semua Menu
      </h2>
      {menuList.length === 0 ? (
        <p className="text-gray-500">Belum ada menu yang ditambahkan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuList.map((item) => (
            <div key={item.id} className="bg-rose-50 border rounded-xl p-4">
              <img src={item.gambar} alt={item.nama} className="w-full h-36 object-cover rounded mb-2" />
              <h4 className="font-semibold text-lg text-gray-800">{item.nama}</h4>
              <p className="text-sm text-gray-500 capitalize">{item.kategori}</p>
              <p className="text-sm font-medium text-rose-600">Rp {item.harga.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMenuList;

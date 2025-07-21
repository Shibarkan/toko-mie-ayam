// src/components/AdminUpload.jsx
import { useState, useRef, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "123456";

const AdminUpload = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [form, setForm] = useState({ nama: "", harga: "", kategori: "makanan" });
  const [file, setFile] = useState(null);
  const [urlPreview, setUrlPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const fileInputRef = useRef(null);

  // ⏳ Cek login dari localStorage
  useEffect(() => {
    const isLogged = localStorage.getItem("admin_logged_in");
    if (isLogged === "true") setLoggedIn(true);
  }, []);

  // 🔁 Ambil data menu
  const fetchMenus = async () => {
    const { data, error } = await supabase.from("menu").select("*").order("id", { ascending: false });
    if (!error) {
      console.log("Data menu:", data);
      setMenuList(data);
    } else {
      console.error("Gagal ambil menu:", error.message);
    }
  };

  useEffect(() => {
    if (loggedIn) fetchMenus();
  }, [loggedIn]);

  // 🔐 Login
  const handleLogin = (e) => {
    e.preventDefault();
    const uname = e.target.username.value;
    const pwd = e.target.password.value;
    if (uname === ADMIN_USERNAME && pwd === ADMIN_PASSWORD) {
      setLoggedIn(true);
      localStorage.setItem("admin_logged_in", "true");
    } else {
      alert("❌ Username atau password salah");
    }
  };

  // 📤 Submit menu baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.harga || !form.kategori || !file) {
      alert("⚠️ Semua field wajib diisi termasuk gambar.");
      return;
    }

    setLoading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("menu-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { publicUrl } = supabase.storage
        .from("menu-images")
        .getPublicUrl(fileName).data;

      const { error: insertError } = await supabase.from("menu").insert([{
        nama: form.nama,
        kategori: form.kategori,
        harga: parseInt(form.harga),
        gambar: publicUrl,
        filename: fileName,
      }]);

      if (insertError) throw insertError;

      alert("✅ Menu berhasil diunggah!");
      setForm({ nama: "", harga: "", kategori: "makanan" });
      setFile(null);
      setUrlPreview("");
      fileInputRef.current.value = "";
      fetchMenus();
    } catch (err) {
      console.error("❌ Upload gagal:", err.message);
      alert("❌ Gagal mengunggah menu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Hapus menu & file
  const handleDelete = async (id, filename) => {
    const confirmDelete = confirm("Yakin ingin menghapus menu ini?");
    if (!confirmDelete) return;

    const { error: delImgErr } = await supabase.storage.from("menu-images").remove([filename]);
    const { error: delDbErr } = await supabase.from("menu").delete().eq("id", id);

    if (delImgErr || delDbErr) {
      console.error("❌ Gagal hapus:", delImgErr || delDbErr);
      alert("❌ Gagal menghapus menu.");
    } else {
      setMenuList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // 🔓 Login screen
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#FB4141] mb-6">Login Admin</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input name="username" placeholder="Username" className="w-full p-2 border rounded" required />
            <input name="password" type="password" placeholder="Password" className="w-full p-2 border rounded" required />
            <button type="submit" className="w-full bg-[#FB4141] text-white p-2 rounded hover:bg-[#e33333] transition">Login</button>
          </form>
        </div>
      </div>
    );
  }

  // 🧾 Upload form + daftar menu
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8f8] to-[#ffe7e7] py-12 px-4">
      <div className="bg-white max-w-2xl mx-auto p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-[#FB4141] mb-6">Tambah Menu Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Nama menu"
            value={form.nama ?? ""}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <select
            value={form.kategori ?? "makanan"}
            onChange={(e) => setForm({ ...form, kategori: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="makanan">🍜 Makanan</option>
            <option value="minuman">🥤 Minuman</option>
            <option value="cemilan">🍩 Cemilan</option>
          </select>
          <input
            type="number"
            placeholder="Harga"
            value={form.harga ?? ""}
            onChange={(e) => setForm({ ...form, harga: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => {
              const selected = e.target.files[0];
              setFile(selected);
              setUrlPreview(URL.createObjectURL(selected));
            }}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="block w-full text-center cursor-pointer bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transition">
            {file ? "📷 Gambar Dipilih" : "📁 Pilih Gambar"}
          </label>

          {urlPreview && (
            <div className="mt-3 text-center">
              <img src={urlPreview} alt="Preview" className="w-32 h-32 object-cover rounded border mx-auto" />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FB4141] text-white p-2 rounded hover:bg-[#e33333] transition"
          >
            {loading ? "⏳ Mengunggah..." : "📤 Upload Menu"}
          </button>
        </form>
      </div>

      {/* 🧾 Menu Preview */}
      <div className="max-w-6xl mx-auto mt-16">
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">📋 Daftar Menu</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {menuList.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-3xl shadow-md hover:shadow-lg transition hover:-translate-y-1"
              >
                <img src={item.gambar} alt={item.nama} className="w-full h-40 object-cover rounded-t-3xl" />
                <div className="p-4 space-y-1">
                  <h4 className="font-bold text-lg text-[#FB4141]">{item.nama}</h4>
                  <p className="text-sm text-gray-600 capitalize">{item.kategori}</p>
                  <p className="text-sm font-semibold text-gray-800">
                    Rp {typeof item.harga === "number" ? item.harga.toLocaleString() : "0"}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.id, item.filename)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                  title="Hapus"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;

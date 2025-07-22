import { useState, useRef, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Image, LogIn, User, Key, FileText, DollarSign, List } from "lucide-react";
import toast from "react-hot-toast";

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

  useEffect(() => {
    const isLogged = localStorage.getItem("admin_logged_in");
    if (isLogged === "true") setLoggedIn(true);
  }, []);

  useEffect(() => {
    if (loggedIn) fetchMenus();
  }, [loggedIn]);

  const fetchMenus = async () => {
    const { data, error } = await supabase.from("menu").select("*").order("id", { ascending: false });
    if (error) return toast.error("Gagal ambil menu: " + error.message);
    setMenuList(data);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const uname = e.target.username.value;
    const pwd = e.target.password.value;
    if (uname === ADMIN_USERNAME && pwd === ADMIN_PASSWORD) {
      setLoggedIn(true);
      localStorage.setItem("admin_logged_in", "true");
    } else {
      toast.error("Username atau password salah");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.harga || !form.kategori || !file) {
      toast.error("Semua field wajib diisi termasuk gambar.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Mengunggah menu...");

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("menu-images").upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: imageData } = supabase.storage.from("menu-images").getPublicUrl(fileName);
      if (!imageData?.publicUrl) throw new Error("Gagal mendapatkan URL gambar");

      const { error: insertError } = await supabase.from("menu").insert([
        {
          nama: form.nama,
          kategori: form.kategori,
          harga: parseInt(form.harga),
          gambar: imageData.publicUrl,
          filename: fileName,
        },
      ]);
      if (insertError) throw insertError;

      toast.success("Menu berhasil diunggah", { id: toastId });
      setForm({ nama: "", harga: "", kategori: "makanan" });
      setFile(null);
      setUrlPreview("");
      fileInputRef.current.value = "";
      fetchMenus();
    } catch (err) {
      console.error("Upload gagal:", err.message);
      toast.error("Gagal upload: " + err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, filename) => {
    const confirmDelete = confirm("Yakin ingin menghapus menu ini?");
    if (!confirmDelete) return;
    const { error: delImgErr } = await supabase.storage.from("menu-images").remove([filename]);
    const { error: delDbErr } = await supabase.from("menu").delete().eq("id", id);
    if (delImgErr || delDbErr) {
      toast.error("Gagal menghapus menu");
    } else {
      setMenuList((prev) => prev.filter((item) => item.id !== id));
      toast.success("Menu berhasil dihapus");
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-white px-4">
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-rose-700 mb-6 flex items-center justify-center gap-2">
            <LogIn /> Login Admin
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex items-center border rounded p-2">
              <User className="text-gray-500 mr-2" size={18} />
              <input name="username" placeholder="Username" className="w-full outline-none" required />
            </div>
            <div className="flex items-center border rounded p-2">
              <Key className="text-gray-500 mr-2" size={18} />
              <input name="password" type="password" placeholder="Password" className="w-full outline-none" required />
            </div>
            <button type="submit" className="w-full bg-rose-600 text-white p-2 rounded hover:bg-rose-700 transition">
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-rose-50 py-12 px-4">
      <div className="bg-white max-w-2xl mx-auto p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-rose-700 mb-6">Tambah Menu Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded p-2">
            <FileText className="text-gray-500 mr-2" size={18} />
            <input
              type="text"
              placeholder="Nama menu"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded p-2">
            <List className="text-gray-500 mr-2" size={18} />
            <select
              value={form.kategori}
              onChange={(e) => setForm({ ...form, kategori: e.target.value })}
              className="w-full outline-none"
              required
            >
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
              <option value="cemilan">Cemilan</option>
            </select>
          </div>
          <div className="flex items-center border rounded p-2">
            <DollarSign className="text-gray-500 mr-2" size={18} />
            <input
              type="number"
              placeholder="Harga"
              value={form.harga}
              onChange={(e) => setForm({ ...form, harga: e.target.value })}
              className="w-full outline-none"
              required
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => {
              const selected = e.target.files[0];
              if (!selected) return;
              if (!selected.type.startsWith("image/")) {
                toast.error("File bukan gambar");
                return;
              }
              setFile(selected);
              setUrlPreview(URL.createObjectURL(selected));
            }}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="flex items-center justify-center gap-2 bg-rose-100 text-rose-700 p-2 rounded cursor-pointer hover:bg-rose-200 transition">
            <Image size={18} />
            {file ? "Gambar telah dipilih" : "Pilih Gambar"}
          </label>
          {urlPreview && (
            <div className="mt-3 text-center">
              <img src={urlPreview} alt="Preview" className="w-32 h-32 object-cover rounded border mx-auto" />
            </div>
          )}
          <button type="submit" disabled={loading} className="w-full bg-rose-600 text-white p-2 rounded hover:bg-rose-700 transition">
            {loading ? "Mengunggah..." : "Upload Menu"}
          </button>
        </form>
      </div>

      <div className="max-w-6xl mx-auto mt-16">
        <h3 className="text-2xl font-semibold mb-6 text-center text-rose-700">Menu Saat Ini</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {menuList.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition hover:-translate-y-1"
              >
                <img src={item.gambar} alt={item.nama} className="w-full h-40 object-cover rounded-t-2xl" />
                <div className="p-4 space-y-1">
                  <h4 className="font-semibold text-lg text-gray-800">{item.nama}</h4>
                  <p className="text-sm text-gray-600 capitalize">{item.kategori}</p>
                  <p className="text-sm font-medium text-gray-900">Rp {item.harga?.toLocaleString() ?? 0}</p>
                </div>
                <button
                  onClick={() => handleDelete(item.id, item.filename)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                  title="Hapus"
                >
                  <Trash2 size={20} />
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

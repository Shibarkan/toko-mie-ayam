// src/components/Admin/AdminUploadMenu.jsx
import { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import toast from "react-hot-toast";

const AdminUploadMenu = () => {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("Makanan");
  const [harga, setHarga] = useState("");
  const [gambarFile, setGambarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!gambarFile) {
      toast.error("Pilih gambar terlebih dahulu.");
      return;
    }

    setLoading(true);

    const fileExt = gambarFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error: uploadError } = await supabase.storage
      .from("menu-images")
      .upload(filePath, gambarFile);

    if (uploadError) {
      toast.error("Upload gambar gagal: " + uploadError.message);
      setLoading(false);
      return;
    }

    const publicUrl = supabase.storage
      .from("menu-images")
      .getPublicUrl(filePath).data.publicUrl;

    // Masukkan ke tabel menu
    const { error } = await supabase.from("menu").insert([
      {
        nama,
        kategori,
        harga: parseInt(harga),
        gambar: publicUrl,
      },
    ]);

    setLoading(false);

    if (error) {
      toast.error("Gagal upload menu: " + error.message);
    } else {
      toast.success("Menu berhasil diupload!");
      setNama("");
      setKategori("Makanan");
      setHarga("");
      setGambarFile(null);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }} className="space-y-4">
      <div>
        <label className="block font-semibold">Nama Menu</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Kategori</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
        >
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
          <option value="Cemilan">Cemilan</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold">Harga</label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Gambar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setGambarFile(e.target.files[0])}
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded font-bold"
      >
        {loading ? "Mengupload..." : "Upload Menu"}
      </button>
    </form>
  );
};

export default AdminUploadMenu;

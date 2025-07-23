import { X, LocateFixed } from "lucide-react";
import { useState } from "react";


const ConfirmIdentity = ({ visible, onClose, onConfirm }) => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [metode, setMetode] = useState("");
  const [lokasi, setLokasi] = useState(null);
  const [loadingLokasi, setLoadingLokasi] = useState(false);

  if (!visible) return null;

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation tidak didukung browser Anda.");
      return;
    }

    setLoadingLokasi(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const koordinat = `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`;
        setAlamat(koordinat);
        setLokasi({ latitude, longitude });
        setLoadingLokasi(false);
      },
      (error) => {
        alert("Gagal mengambil lokasi. Pastikan izin lokasi diaktifkan.");
        setLoadingLokasi(false);
      }
    );
  };

  const handleSubmit = () => {
    if (!nama || !alamat || !metode) {
      alert("Mohon lengkapi semua data.");
      return;
    }
    onConfirm({ nama, alamat, metode, lokasi });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative shadow-xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Konfirmasi Identitas</h2>
        <div className="space-y-4">
          {/* Nama */}
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none"
          />

          {/* Alamat / Koordinat */}
          <div className="relative">
            <textarea
              placeholder="Alamat atau Koordinat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg focus:outline-none pr-12"
              rows={2}
            />
            <button
              onClick={handleGetLocation}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              title="Ambil Lokasi Otomatis"
            >
              {loadingLokasi ? (
                <span className="text-xs animate-pulse">Memuat...</span>
              ) : (
                <LocateFixed size={20} />
              )}
            </button>
          </div>

          {/* Metode Pesanan */}
          <select
            value={metode}
            onChange={(e) => setMetode(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none"
          >
            <option value="">Pilih Metode Pesanan</option>
            <option value="Dine In">Dine In (Makan di tempat)</option>
            <option value="Take Away">Take Away (Bungkus)</option>
          </select>
        </div>

        {/* Tombol Konfirmasi */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-3 bg-[#FB4141] text-white rounded-xl font-semibold hover:bg-[#e33333] transition"
        >
          Konfirmasi
        </button>
      </div>
    </div>
  );
};

export default ConfirmIdentity;

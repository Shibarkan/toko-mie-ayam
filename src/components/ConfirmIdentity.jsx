// src/components/Order/ConfirmIdentity.jsx
import { X } from "lucide-react";
import { useState } from "react";

const ConfirmIdentity = ({ visible, onClose, onConfirm }) => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [metode, setMetode] = useState("");

  if (!visible) return null;

  const handleSubmit = () => {
    if (!nama || !alamat || !metode) {
      alert("Mohon lengkapi semua data.");
      return;
    }
    onConfirm({ nama, alamat, metode });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative shadow-xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Konfirmasi Identitas</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none"
          />
          <textarea
            placeholder="Alamat Lengkap"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none"
          />
          <input
            type="text"
            placeholder="Metode Pembayaran (COD / Transfer)"
            value={metode}
            onChange={(e) => setMetode(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none"
          />
        </div>
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
// src/components/Order/ProductItem.jsx
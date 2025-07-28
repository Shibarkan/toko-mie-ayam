// src/components/Order/ConfirmIdentity.jsx
import { X } from "lucide-react";
import { useState } from "react";
import Stepper, { Step } from "./Stepperreactbits/Stepper"; // Ubah jika path Stepper berbeda

const ConfirmIdentity = ({ visible, onClose, onConfirm }) => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [blok, setBlok] = useState("");
  const [patokan, setPatokan] = useState("");
  const [metode, setMetode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  const handleSubmit = async () => {
    if (!nama) return alert("Nama wajib diisi.");
    if (metode === "Delivery" && (!alamat || !blok || !patokan)) {
      return alert("Mohon lengkapi semua data untuk delivery.");
    }

    setLoading(true);

    const fullAlamat =
      metode === "Delivery"
        ? `${alamat} (Blok/RT/RW: ${blok}, Patokan: ${patokan})`
        : "- (Akan diambil sendiri)";

    setTimeout(() => {
      onConfirm({ nama, alamat: fullAlamat, metode });
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    setNama("");
    setAlamat("");
    setBlok("");
    setPatokan("");
    setMetode("");
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full sm:max-w-md md:max-w-lg lg:max-w-xl rounded-xl p-4 sm:p-6 relative shadow-xl">
        <button
          onClick={handleReset}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <Stepper
          initialStep={1}
          onFinalStepCompleted={handleSubmit}
          backButtonText="← Kembali"
          nextButtonText={loading ? "Memproses..." : "Lanjut"}
          nextButtonProps={{
            disabled: loading,
            className:
              "bg-[#FB4141] text-white px-4 py-2 rounded-xl hover:bg-[#e33333] transition disabled:opacity-50",
          }}
          backButtonProps={{
            className: "text-gray-600 hover:text-gray-800 px-3 py-1 rounded-xl",
          }}
        >
          <Step>
            <div className="text-center space-y-6">
              <h2 className="text-xl font-bold text-gray-800">
                🚚 Pilih Metode Pesanan
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() => setMetode("Delivery")}
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    metode === "Delivery"
                      ? "bg-[#FB4141] text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  Delivery (Diantar ke rumah)
                </button>
                <button
                  onClick={() => setMetode("Pick Up")}
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    metode === "Pick Up"
                      ? "bg-[#FB4141] text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  Pick Up (Ambil sendiri)
                </button>
              </div>
            </div>
          </Step>

          <Step>
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 text-center">
                📝 Isi Identitas Pemesan
              </h2>
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full border px-4 py-3 rounded-lg focus:outline-none"
              />
              {metode === "Delivery" && (
                <>
                  <textarea
                    placeholder="Alamat lengkap (jalan, nomor rumah, desa)"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    className="w-full border px-4 py-3 rounded-lg focus:outline-none"
                    rows={2}
                  />
                  <input
                    type="text"
                    placeholder="Blok / RT / RW"
                    value={blok}
                    onChange={(e) => setBlok(e.target.value)}
                    className="w-full border px-4 py-3 rounded-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Ancer-ancer (patokan lokasi rumah)"
                    value={patokan}
                    onChange={(e) => setPatokan(e.target.value)}
                    className="w-full border px-4 py-3 rounded-lg focus:outline-none"
                  />
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> Ongkir ditanggung pembeli.
                  </p>
                </>
              )}
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  );
};

export default ConfirmIdentity;

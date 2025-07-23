import React, { useRef } from "react";
import { X, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { toast } from "react-hot-toast"; 

const ReceiptModal = ({ visible, onClose, items, total, logo, onSend, orderNumber }) => {
  const receiptRef = useRef();

  if (!visible) return null;

  const handleDownload = async () => {
    if (!receiptRef.current) return;
    try {
      const canvas = await html2canvas(receiptRef.current, { useCORS: true });
      const link = document.createElement("a");
      link.download = `struk-pemesanan-${orderNumber}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast.success("Struk berhasil diunduh sebagai gambar!"); // ✅ Notifikasi
    } catch (err) {
      toast.error("Gagal mengunduh struk.");
    }
  };

  const today = new Date();
  const tanggal = today.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div ref={receiptRef} className="text-center mb-6">
          <img src={logo} alt="Logo" className="h-16 mx-auto mb-2" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Struk Pemesanan</h2>

          <div className="text-sm text-gray-500 mb-2">
            <p>No. Pemesanan: <span className="font-medium">#{orderNumber}</span></p>
            <p>{tanggal}</p>
          </div>

          <hr className="my-4 border-t border-gray-300" />

          <div className="divide-y divide-gray-200 text-left">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between py-2 text-sm text-gray-700"
              >
                <span>{item.nama} x{item.quantity}</span>
                <span>Rp {((item.harga || 0) * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <hr className="my-4 border-t border-gray-300" />

          <div className="flex justify-between font-bold text-lg text-[#FB4141]">
            <span>Total:</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>

          <hr className="my-4 border-t border-gray-300" />

          <p className="text-xs text-gray-400 mt-4">Terima kasih telah memesan. Simpan struk ini sebagai bukti pembelian.</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            <Download size={18} /> Download Struk
          </button>

          <button
            onClick={onSend}
            className="w-full py-3 bg-[#FB4141] text-white rounded-xl font-semibold hover:bg-[#e33333] transition"
          >
            Kirim Struk ke WhatsApp Penjual
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
  
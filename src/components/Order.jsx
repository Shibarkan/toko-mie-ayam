// src/components/Order/Order.jsx
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import petok from "../assets/sounds/petok.mp3";
import logo from "../assets/logo.png";
import Testimoni from "./Testimoni";
import ReceiptModal from "./ReceiptModal";
import ConfirmIdentity from "./ConfirmIdentity";
import CategorySection from "./CategorySection";

const WA_NUMBER = "6283156980314";

const Order = ({ products }) => {
  const [cart, setCart] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);
  const [showIdentity, setShowIdentity] = useState(false);
  const [buyer, setBuyer] = useState({ nama: "", alamat: "", metode: "" });

  const groupedProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      if (!acc[product.kategori]) acc[product.kategori] = [];
      acc[product.kategori].push(product);
      return acc;
    }, {});
  }, [products]);

  const increment = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    new Audio(petok).play().catch(console.warn);
  };

  const decrement = (id) => {
    if (cart[id] > 0) {
      setCart((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    }
  };

  const getTotal = () =>
    products.reduce((t, p) => t + (cart[p.id] || 0) * p.harga, 0);

  const orderItems = products.filter((item) => cart[item.id] > 0);

  const handleWACheckout = () => setShowIdentity(true);

  const handleSend = () => {
    const itemStr = orderItems
      .map((item) => `- ${item.nama} x${cart[item.id]}: Rp ${(item.harga * cart[item.id]).toLocaleString()}`)
      .join("%0A");

    const waText = `Halo kak, saya ingin pesan:%0A${itemStr}%0A%0ATotal: Rp ${getTotal().toLocaleString()}%0A%0AAtas nama: ${buyer.nama}%0AAlamat: ${buyer.alamat}%0AMetode Pembayaran: ${buyer.metode}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${waText}`, "_blank");

    setCart({});
    setShowReceipt(false);
  };

  const hasItems = Object.values(cart).some((qty) => qty > 0);

  return (
    <div className="px-6 py-24">
      <div className="space-y-16">
        {Object.entries(groupedProducts).map(([category, items]) => (
          <CategorySection
            key={category}
            title={category}
            items={items}
            cart={cart}
            increment={increment}
            decrement={decrement}
          />
        ))}
      </div>

      {hasItems && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-6 z-50"
        >
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div>
              <p className="text-gray-700 text-base">Total Pesanan:</p>
              <p className="text-3xl font-bold text-[#FB4141]">
                Rp {getTotal().toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleWACheckout}
              className="px-8 py-4 bg-[#FB4141] text-white text-lg rounded-xl font-semibold hover:bg-[#e33333] transition"
            >
              Proses
            </button>
          </div>
        </motion.div>
      )}

      <ReceiptModal
        visible={showReceipt}
        onClose={() => setShowReceipt(false)}
        items={orderItems.map((item) => ({ ...item, quantity: cart[item.id] || 0 }))}
        total={getTotal()}
        logo={logo}
        onSend={handleSend}
      />

      <ConfirmIdentity
        visible={showIdentity}
        onClose={() => setShowIdentity(false)}
        onConfirm={(data) => {
          setBuyer(data);
          setShowIdentity(false);
          setShowReceipt(true);
        }}
      />
    </div>
  );
};

export default Order;

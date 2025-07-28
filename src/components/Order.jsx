import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import petok from "../assets/sounds/petok.mp3";
import logo from "../assets/logo.jpg";
import CategorySection from "./Order/CategorySection";
import ReceiptModal from "./Order/ReceiptModal";
import ConfirmIdentity from "./Order/ConfirmIdentity";

const WA_NUMBER = "6283156980314";

const Order = ({ products }) => {
  const [cart, setCart] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);
  const [showIdentity, setShowIdentity] = useState(false);
  const [buyer, setBuyer] = useState({ nama: "", alamat: "", metode: "" });

  // ✅ Normalisasi kategori ke lowercase agar tidak menambah section baru
  const groupedProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      const kategori = product.kategori.toLowerCase();
      if (!acc[kategori]) acc[kategori] = [];
      acc[kategori].push(product);
      return acc;
    }, {});
  }, [products]);

  const increment = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        quantity: (prev[id]?.quantity || 0) + 1,
        note: prev[id]?.note || "",
      },
    }));
    new Audio(petok).play().catch(console.warn);
  };

  const decrement = (id) => {
    setCart((prev) => {
      if ((prev[id]?.quantity || 0) <= 1) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return {
        ...prev,
        [id]: {
          ...prev[id],
          quantity: prev[id].quantity - 1,
        },
      };
    });
  };

  const setNote = (id, note) => {
    setCart((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        quantity: prev[id]?.quantity || 1,
        note,
      },
    }));
  };

  const getTotal = () =>
    products.reduce((t, p) => t + (cart[p.id]?.quantity || 0) * p.harga, 0);

  const orderItems = products
    .filter((item) => cart[item.id]?.quantity > 0)
    .map((item) => ({
      ...item,
      quantity: cart[item.id].quantity,
      note: cart[item.id].note,
    }));

  const handleWACheckout = () => setShowIdentity(true);

  const hasItems = Object.values(cart).some((val) => val.quantity > 0);

  return (
    <div className="px-6 py-24">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-red-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg mb-16">
        Pesan Di bawah
      </h1>
      <div className="space-y-16">
        {Object.entries(groupedProducts).map(([category, items]) => (
          <CategorySection
            key={category}
            title={category}
            items={items}
            cart={cart}
            increment={increment}
            decrement={decrement}
            setNote={setNote}
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
        items={orderItems}
        total={getTotal()}
        logo={logo}
        orderNumber={123}
        userData={buyer}
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

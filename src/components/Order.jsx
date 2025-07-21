import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import petok from "../assets/sounds/petok.mp3";
import Testimoni from "./Testimoni";
import { Plus, Minus } from "lucide-react";
import { useInView } from "react-intersection-observer";

const Order = ({ products }) => {
  const [cart, setCart] = useState({});
  const [showTestimoni, setShowTestimoni] = useState(false);
  const [loading, setLoading] = useState(false);

  // Group products by category
  const groupedProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      if (!acc[product.kategori]) acc[product.kategori] = [];
      acc[product.kategori].push(product);
      return acc;
    }, {});
  }, [products]);

  // Add product
  const increment = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
    new Audio(petok).play().catch((err) => console.warn("Audio error:", err));
  };

  // Remove product
  const decrement = (productId) => {
    if (cart[productId] > 0) {
      setCart((prev) => ({
        ...prev,
        [productId]: prev[productId] - 1,
      }));
    }
  };

  const getTotal = () =>
    products.reduce((total, product) => {
      const quantity = cart[product.id] || 0;
      return total + product.harga * quantity;
    }, 0);

  // Handle Midtrans Checkout
  const handleCheckout = async () => {
    try {
      setLoading(true);

      const orderItems = products
        .filter((item) => cart[item.id] > 0)
        .map((item) => ({
          id: item.id.toString(),
          price: item.harga,
          quantity: cart[item.id],
          name: item.nama,
          category: item.kategori,
        }));

      const total = getTotal();

      const requestBody = {
        transaction_details: {
          order_id: `ORDER-${Date.now()}`,
          gross_amount: total,
        },
        item_details: orderItems,
        customer_details: {
          first_name: "Guest",
          email: "guest@example.com",
          phone: "08111222333",
        },
        credit_card: { secure: true },
      };

      const response = await fetch(
        "http://localhost:3001/api/create-transaction",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Gagal membuat transaksi");

      if (data.token) {
        window.snap.pay(data.token, {
          onSuccess: () => {
            setCart({});
            setShowTestimoni(true);
          },
          onPending: () => alert("Pembayaran sedang diproses"),
          onError: () => alert("Pembayaran gagal"),
          onClose: () => alert("Popup pembayaran ditutup"),
        });
      }
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Kategori & Produk
  // Kategori & Produk (UPDATE BAGIAN INI SAJA)
  // Ganti bagian CategorySection dengan ini:
  const CategorySection = ({ title, items }) => {
    const { ref } = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });

    return (
      <div
        className="mb-14"
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 capitalize">
          {title === "makanan" && "🍜"}
          {title === "minuman" && "🥤"}
          {title === "cemilan" && "🍟"}
          <span className="ml-2">{title}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-1 bg-white rounded-xl shadow p-4 flex justify-center items-center h-full">
            <img
              src="https://i.pinimg.com/736x/40/ff/45/40ff45a5ae70a855cf1292e8f2a8100c.jpg"
              alt={`Kategori ${title}`}
              className="rounded-lg object-cover max-h-[250px]"
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            {items.map((product, index) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                {/* Info Produk */}
                <motion.div className="flex items-center gap-4 w-full sm:w-2/3">
                  <img
                    src={product.gambar}
                    alt={product.nama}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold text-gray-800 leading-tight">
                      {product.nama}
                    </h4>
                    <p className="text-[#FB4141] font-bold text-base">
                      Rp {product.harga.toLocaleString()}
                    </p>
                  </div>
                </motion.div>

                {/* Tombol Cart */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => decrement(product.id)}
                    disabled={!cart[product.id]}
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition text-lg ${
                      cart[product.id]
                        ? "bg-[#FB4141] text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-xl font-bold w-6 text-center">
                    {cart[product.id] || 0}
                  </span>
                  <button
                    onClick={() => increment(product.id)}
                    className="w-9 h-9 flex items-center justify-center bg-[#FB4141] text-white rounded-full hover:bg-[#e33333] transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const hasItems = Object.values(cart).some((qty) => qty > 0);

  return (
    <div className="px-6 py-24">
      {/* Product Section */}
      <div className="space-y-16">
        {Object.entries(groupedProducts).map(([category, items]) => (
          <CategorySection key={category} title={category} items={items} />
        ))}
      </div>

      {/* Checkout Bar */}
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
              onClick={handleCheckout}
              disabled={loading}
              className="px-8 py-4 bg-[#FB4141] text-white text-lg rounded-xl font-semibold hover:bg-[#e33333] transition disabled:bg-gray-400"
            >
              {loading ? "Memproses..." : "Bayar Sekarang"}
            </button>
          </div>
        </motion.div>
      )}

      {/* Modal Testimoni */}
      <Testimoni
        visible={showTestimoni}
        onClose={() => setShowTestimoni(false)}
        onSubmit={(data) => {
          console.log("Testimoni submitted:", data);
          setShowTestimoni(false);
        }}
      />
    </div>
  );
};

export default Order;

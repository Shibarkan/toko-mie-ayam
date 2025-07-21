import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import petok from "../assets/sounds/petok.mp3";
import Testimoni from "./Testimoni";

const Order = ({ products }) => {
  const [cart, setCart] = useState({});
  const [showTestimoni, setShowTestimoni] = useState(false);
  const [loading, setLoading] = useState(false);

  // Group products by category
  const groupedProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      if (!acc[product.kategori]) {
        acc[product.kategori] = [];
      }
      acc[product.kategori].push(product);
      return acc;
    }, {});
  }, [products]);

  // Cart functions
  const increment = (productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    new Audio(petok).play().catch(err => console.warn("Audio error:", err));
  };

  const decrement = (productId) => {
    if (cart[productId] > 0) {
      setCart(prev => ({
        ...prev,
        [productId]: prev[productId] - 1
      }));
    }
  };

  const getTotal = () => {
    return products.reduce((total, product) => {
      const quantity = cart[product.id] || 0;
      return total + (product.harga * quantity);
    }, 0);
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const orderItems = products
        .filter(item => cart[item.id] > 0)
        .map(item => ({
          id: item.id.toString(),
          price: item.harga,
          quantity: cart[item.id],
          name: item.nama,
          category: item.kategori
        }));

      const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const requestBody = {
        transaction_details: {
          order_id: `ORDER-${Date.now()}`,
          gross_amount: total
        },
        item_details: orderItems,
        customer_details: {
          first_name: "Guest Customer",
          email: "guest@example.com",
          phone: "08111222333"
        },
        credit_card: {
          secure: true
        }
      };

      const response = await fetch('http://localhost:3001/api/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment creation failed');
      }

      if (data.token) {
        window.snap.pay(data.token, {
          onSuccess: function(result) {
            console.log('Payment success:', result);
            setCart({});
            setShowTestimoni(true);
          },
          onPending: function(result) {
            console.log('Payment pending:', result);
            alert("Pembayaran sedang diproses");
          },
          onError: function(result) {
            console.error('Payment error:', result);
            alert("Pembayaran gagal");
          },
          onClose: function() {
            console.log('Customer closed the popup without finishing the payment');
            alert("Popup pembayaran ditutup");
          }
        });
      }
    } catch (error) {
      console.error('Checkout Error:', error);
      alert('Terjadi kesalahan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const CategorySection = ({ title, items }) => (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        {title === 'makanan' && '🍜'}
        {title === 'minuman' && '🥤'}
        {title === 'cemilan' && '🍟'}
        <span className="ml-2 capitalize">{title}</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <img 
                src={product.gambar} 
                alt={product.nama} 
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-medium text-gray-800">{product.nama}</h4>
                <p className="text-[#FB4141] font-semibold">
                  Rp {product.harga.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => decrement(product.id)}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition
                  ${cart[product.id] ? 'bg-[#FB4141] text-white' : 'bg-gray-100 text-gray-400'}`}
                disabled={!cart[product.id]}
              >
                -
              </button>
              <span className="w-8 text-center font-medium">
                {cart[product.id] || 0}
              </span>
              <button 
                onClick={() => increment(product.id)}
                className="w-8 h-8 flex items-center justify-center bg-[#FB4141] text-white rounded-full hover:bg-[#e33333] transition"
              >
                +
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const hasItems = Object.values(cart).some(qty => qty > 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Menu Sections */}
      <div className="mb-20">
        {Object.entries(groupedProducts).map(([category, items]) => (
          <CategorySection key={category} title={category} items={items} />
        ))}
      </div>

      {/* Floating Cart Button */}
      {hasItems && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4"
        >
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <p className="text-gray-600">Total Pesanan:</p>
              <p className="text-2xl font-bold text-[#FB4141]">
                Rp {getTotal().toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="px-8 py-3 bg-[#FB4141] text-white rounded-xl font-semibold hover:bg-[#e33333] transition disabled:bg-gray-400"
            >
              {loading ? "Memproses..." : "Bayar Sekarang"}
            </button>
          </div>
        </motion.div>
      )}

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
// src/components/ProductCard.jsx
import { motion } from "framer-motion";
import petok from "../assets/sounds/petok.mp3";
import logo from "../assets/logo.jpg";

const ProductCard = ({ product }) => {
  const handleClick = () => {
    const audio = new Audio(petok);
    audio.play().catch((err) => console.warn("Audio playback error:", err));
  };

  const formatHarga = (harga) => {
    return harga ? `Rp ${Number(harga).toLocaleString("id-ID")}` : "Rp -";
  };

  return (
    <motion.div
      className="relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
    >
      <img
        src={logo}
        alt="Logo"
        className="absolute top-2 left-2 w-10 h-10 rounded-full bg-white p-1 shadow z-10"
      />

      <img
        src={
          product.gambar || "https://via.placeholder.com/300x200?text=No+Image"
        }
        alt={product.nama}
        className="w-full h-40 object-cover bg-gray-100"
        onError={(e) =>
          (e.target.src =
            "https://via.placeholder.com/300x200?text=Image+Error")
        }
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {product.nama}
        </h3>
        <p className="text-sm text-gray-500 capitalize mb-1">
          {product.kategori}
        </p>
        <p className="text-red-600 font-bold text-lg">
          {formatHarga(product.harga)}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;

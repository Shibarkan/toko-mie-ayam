import { motion } from 'framer-motion';
import petok from '../assets/sounds/petok.mp3';

const ProductCard = ({ product }) => {
  const handleClick = () => {
    const audio = new Audio(petok); 
    audio.play();
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      <img
        src={product.gambar}
        alt={product.nama}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{product.nama}</h3>
        <p className="text-sm text-gray-500 capitalize">{product.kategori}</p>
        <p className="text-red-500 font-semibold mt-2">
          Rp {product.harga?.toLocaleString('id-ID') || 'N/A'}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;

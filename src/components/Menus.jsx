// src/components/Menus.jsx
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const Menus = ({ filtered }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14" >
      <motion.h2
        className="text-3xl font-bold text-center text-[#FB4141] mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Daftar Menu
      </motion.h2>

      {filtered.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filtered.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </motion.div>
      ) : (
        <motion.p
          className="text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Menu tidak ditemukan.
        </motion.p>
      )}
    </section>
  );
};

export default Menus;

// src/components/Menus.jsx
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { FaUtensils } from "react-icons/fa";

const Menus = ({ filtered }) => {
  return (
    <section id="menus" className="px-6 py-24">
      <motion.h2
        className="text-6xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-red-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg mb-20 tracking-wide leading-tight"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        viewport={{ once: true }}
      >
        <span className="text-[90px] inline-block"></span> Daftar Menu Kami{" "}
      </motion.h2>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
              transition={{
                duration: 0.2,
                delay: index * 0.1,
                type: "spring",
              }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <ProductCard product={item} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center text-center text-gray-500 mt-24"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <FaUtensils className="text-[180px] mb-8 text-[#FB4141] drop-shadow-xl" />
          <p className="text-3xl font-semibold text-gray-600">
            Menu tidak ditemukan. Coba cari yang lain ya~
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default Menus;

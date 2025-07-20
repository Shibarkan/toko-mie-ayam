import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const Main = () => {
  const [menu, setMenu] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase.from("menu").select("*");
      if (error) {
        console.error("Error fetching menu:", error);
      } else {
        setMenu(data);
        setFiltered(data);
      }
    };

    fetchMenu();
  }, []);

  const handleSearch = (query) => {
    const result = menu.filter((item) =>
      item?.nama?.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <main className="pt-20 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="bg-fixed bg-center bg-cover text-white text-center py-24 px-4"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/e8/23/e2/e823e2f57fd6fb2fcd10a512e53b9449.jpg')",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          Selamat Datang di <br className="md:hidden" />
          <span className="text-[#FB4141]">Toko Mie Ayam</span>
        </h1>
        <p className="text-lg md:text-xl mt-4 drop-shadow">
          Nikmati cita rasa khas, setiap suapan!
        </p>
      </motion.section>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 py-14">
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
    </main>
  );
};

export default Main;

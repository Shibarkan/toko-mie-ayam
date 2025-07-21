// src/components/Main.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import Menus from "./Menus";
import Order from "./Order";
import Location from "./Location";

const Main = () => {
  const [menu, setMenu] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase.from("menu").select("*");
      if (error) {
        console.error("Supabase fetch error:", error.message);
      } else {
        setMenu(data);
        setFiltered(data);
      }
    };
    fetchMenu();
  }, []);

  const handleSearch = (query) => {
    const lower = query.toLowerCase();
    const filteredMenu = menu.filter((item) =>
      item.nama.toLowerCase().includes(lower)
    );
    setFiltered(filteredMenu);
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section 
        className="bg-fixed bg-cover bg-center bg-no-repeat text-white min-h-screen flex flex-col items-center justify-center px-4"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/e8/23/e2/e823e2f57fd6fb2fcd10a512e53b9449.jpg')",
        }}
        id="main"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center p-6 rounded-xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            Selamat Datang di <br className="md:hidden" />
            <span className="text-[#FB4141]">Toko Mie Ayam</span>
          </h1>
          <p className="text-lg md:text-xl mt-4 drop-shadow">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga nemo
            voluptatibus inventore ducimus commodi totam quod at ad perferendis
            ex quae ut corrupti eveniet iusto possimus aliquam, laborum rem sed?
          </p>
        </motion.div>
      </section>

      {/* Search */}
      <section id="menu" className="max-w-4xl mx-auto mt-10 px-4">
        <SearchBar onSearch={handleSearch} allProducts={menu} />
      </section>

      {/* Menu */}
      <Menus filtered={filtered} />

      {/* Order */}
      <section id="order">
        <Order products={menu} />
      </section>

      <Location />
    </main>
  );
};

export default Main;

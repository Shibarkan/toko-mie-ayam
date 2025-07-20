// src/components/Header.jsx
import { FaUtensils, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import petok from '../assets/sounds/petok.mp3';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const clickSound = useRef(null);

  const handleToggleMenu = () => {
    if (clickSound.current) clickSound.current.play();
    setMenuOpen((prev) => !prev);
  };

  return (
    <motion.header
      className="bg-[#FB4141] text-white shadow-md fixed top-0 w-full z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
    >
      <audio ref={clickSound} src={petok} preload="auto" />

      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        <div className="flex items-center space-x-2 text-2xl font-bold">
          <FaUtensils className="text-white" />
          <span>Toko Mie Ayam</span>
        </div>

        {/* Desktop Menu */}
        <nav className="space-x-4 hidden md:flex text-white font-medium">
          <a href="#menu" className="hover:text-yellow-100 transition-all duration-300">Menu</a>
          <a href="#order" className="hover:text-yellow-100 transition-all duration-300">Pesan</a>
          <a href="#admin" className="hover:text-yellow-100 transition-all duration-300">Admin</a>
        </nav>

        {/* Hamburger Button */}
        <button
          onClick={handleToggleMenu}
          className="md:hidden text-white text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="md:hidden bg-[#FB4141] px-4 pb-4 space-y-3 text-white font-medium"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <a href="#menu" className="block hover:text-yellow-100">Menu</a>
            <a href="#order" className="block hover:text-yellow-100">Pesan</a>
            <a href="#admin" className="block hover:text-yellow-100">Admin</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

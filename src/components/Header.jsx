// src/components/Header.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FaUtensils } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import petok from "../assets/sounds/petok.mp3";

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Menu", href: "/#menu" },
    { name: "Pesan", href: "/#order" },
    { name: "Lokasi", href: "/#location" },
    { name: "Admin", href: "/admin" },
  ];

  const handleClick = () => {
    const audio = new Audio(petok);
    audio.play().catch((err) => console.warn("Audio playback error:", err));
  };

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-[#FB4141]/90 shadow-md z-50 border-b border-red-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-16">
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:opacity-90 transition flex items-center gap-2"
          onClick={handleClick}
        >
          <FaUtensils className="text-white" />
          <span>Toko Mie Ayam</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`relative text-white hover:text-yellow-200 font-medium transition group ${
                location.pathname + location.hash === item.href ? "text-yellow-200" : ""
              }`}
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-200 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button
            onClick={() => {
              handleClick();
              setOpen(!open);
            }}
            className="text-white hover:text-yellow-200 transition"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setOpen(false)}
              className="block text-white hover:text-yellow-200 font-medium transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

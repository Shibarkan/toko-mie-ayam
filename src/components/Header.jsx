// src/components/Header.jsx
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { FaUtensils } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import petok from "../assets/sounds/petok.mp3";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const navigation = [
    { name: "Beranda", href: "#main" },
    { name: "Menu", href: "/#menu" },
    { name: "Pesan", href: "/#order" },
    { name: "Lokasi", href: "/#location" },
    { name: "Admin", href: "/admin" },
  ];

  const handleClick = () => {
    const audio = new Audio(petok);
    audio.play().catch((err) => console.warn("Audio playback error:", err));
  };

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowHeader(currentY <= lastScrollY.current || currentY < 50);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full transition-transform duration-300 z-50 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } backdrop-blur-md bg-[#FB4141]/90 shadow-md border-b border-red-500`}
    >
      <div className="w-full px-4 sm:px-6 flex items-center justify-between h-16 max-w-screen-xl mx-auto overflow-hidden">
        {/* Logo */}
        <Link
          to="/"
          onClick={handleClick}
          className="text-xl sm:text-2xl font-bold text-white hover:opacity-90 transition flex items-center gap-2 whitespace-nowrap"
        >
          <FaUtensils className="text-white" />
          <span className="truncate">Toko Mie Ayam</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`relative text-white hover:text-yellow-200 font-medium transition group ${
                location.pathname + location.hash === item.href
                  ? "text-yellow-200"
                  : ""
              }`}
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-200 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => {
            handleClick();
            setOpen(!open);
          }}
          className="md:hidden text-white hover:text-yellow-200 transition"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Items */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-2 bg-[#FB4141]/90">
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

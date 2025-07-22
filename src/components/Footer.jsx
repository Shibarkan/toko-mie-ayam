import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Earth } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#FB4141] text-white pt-10 pb-6 px-6 sm:px-12 shadow-inner backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 items-start text-sm">
        {/* Kolom 1: Logo dan Nama */}
        <div className="flex flex-col items-start sm:items-start gap-3">
          <img
            src={logo}
            alt="Logo Toko Mie Ayam"
            className="w-16 h-16 object-contain transition-transform hover:scale-105 duration-300 bg-transparent rounded-full shadow-lg"
          />
          <h2 className="text-lg font-bold">Toko Mie Ayam</h2>
          <p className="text-white/80 max-w-xs">
            Lu Mie Ayam kita teman, hanya cinta dan Mie Ayam.
          </p>
        </div>

        {/* Kolom 2: Info Lokasi */}
        <div>
          <h2 className="text-lg font-bold mb-3">Lokasi & Jam Buka</h2>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt /> Jl. Kenyang Selalu No.10, Semarang
          </p>
          <p className="mt-1">Telp/WA: 0812-3456-7890</p>
          <p className="mt-1">Buka: Senin - Sabtu, 09.00 - 21.00</p>
        </div>

        {/* Kolom 3: Sosial Media */}
        <div>
          <h2 className="text-lg font-bold mb-3"> Ikuti Kami</h2>
          <p className="mb-3 text-white/80">Yuk lihat keseruan dapur kami!</p>
          <div className="flex gap-5 text-2xl">
            <a
              href="https://www.instagram.com/si_shuu/"
              target="_blank"
              className="hover:text-yellow-200 transition duration-300"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/623156980314"
              target="_blank"
              className="hover:text-yellow-200 transition duration-300"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Garis Pembatas */}
      <div className="border-t border-white/20 mt-8 pt-4 text-center text-xs text-white/70">
        &copy; 2025 Toko Mie Ayam. Hanya cinta dan Mie Ayam 🍜.
      </div>
    </motion.footer>
  );
};

export default Footer;

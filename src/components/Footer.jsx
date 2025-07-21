import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#FB4141]/90 text-white pt-10 pb-6 px-6 sm:px-12"
    >
      {/* Atas: Info dan Navigasi */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">
        {/* Kolom 1: Tentang Toko */}
        <div>
          <h2 className="text-lg font-bold mb-3">🍜 Toko Mie Ayam</h2>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt /> Jl. Kenyang Selalu No.10, Semarang
          </p>
          <p className="mt-1">Telp/WA: 0812-3456-7890</p>
          <p className="mt-1">Buka: Senin - Sabtu, 09.00 - 21.00</p>
        </div>


        {/* Kolom 3: Sosial Media */}
        <div>
          <h2 className="text-lg font-bold mb-3">Ikuti Kami</h2>
          <p className="mb-2">Yuk lihat keseruan dapur kami!</p>
          <div className="flex gap-4 text-xl">
            <a href="https://www.instagram.com/si_shuu/" target="_blank" className="hover:text-yellow-200"><FaInstagram /></a>
            <a href="https://wa.me/623156980314" target="_blank" className="hover:text-yellow-200"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      {/* Bawah: Hak Cipta */}
      <div className="mt-8 text-center text-xs opacity-80">
        <p>&copy; 2025 Toko Mie Ayam. Hanya cinta dan Mie Ayam.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;

// src/components/Footer.jsx
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-[#FB4141] text-white text-center py-4 mt-12"
      initial={{ y: 80, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 14 }}
    >
      <p className="text-sm">&copy; 2025 Toko Mie Ayam. All rights reserved.</p>
      <p className="text-xs mt-1 opacity-80">Dibuat dengan ❤️ oleh Developer Indonesia</p>
    </motion.footer>
  );
};

export default Footer;

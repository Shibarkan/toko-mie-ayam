import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Location = () => {
  return (
    <section
      id="location"
      className="bg-[#fff6f6] py-16 px-6 md:px-12 border-t border-gray-100"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#FB4141] mb-3 flex items-center justify-center gap-2">
          <MapPin className="text-[#FB4141]" size={28} />
          Lokasi Toko Kami
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Kami berada di lokasi strategis yang mudah diakses. Silakan datang
          langsung atau pesan lewat WhatsApp untuk layanan cepat!
        </p>

        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300 mb-8">
          <iframe
            title="Lokasi Toko Mie Ayam"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.002593699557!2d110.4010131!3d-7.884855899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a579842c3b2a3%3A0xd3c1f4a2a3e4bb8f!2sViar%20ATK!5e0!3m2!1sen!2sid!4v1721452800000!5m2!1sen!2sid"
            className="w-full h-[320px] md:h-[420px] border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <motion.address
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="not-italic text-gray-700 text-sm md:text-base"
        >
          <strong className="text-lg text-gray-900">Toko Mie Ayam Maknyus</strong>
          <br />
          Viar ATK, Jl. Ringroad Selatan
          <br />
          Yogyakarta, Indonesia
          <br />
          <a
            href="https://www.google.com/maps?q=Viar+atk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FB4141] underline hover:text-[#d83131] inline-block mt-2"
          >
            📍 Buka di Google Maps
          </a>
        </motion.address>
      </motion.div>
    </section>
  );
};

export default Location;

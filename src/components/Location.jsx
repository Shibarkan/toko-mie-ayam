const Location = () => {
  return (
    <section
      id="location"
      className="bg-white py-12 px-4 md:px-8 border-t border-gray-200 relative"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#FB4141] mb-4">
          Lokasi Toko Kami
        </h2>
        <p className="text-gray-600 mb-6">
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum sint voluptatibus corrupti aut rem, aspernatur iste numquam non nihil corporis at? Temporibus aspernatur recusandae sapiente vitae corporis odit vel molestiae.
        </p>

        <div className="mb-6 rounded-xl overflow-hidden shadow-lg border border-gray-300">
          <iframe
            title="Lokasi Toko Mie Ayam"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.002593699557!2d110.4010131!3d-7.884855899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a579842c3b2a3%3A0xd3c1f4a2a3e4bb8f!2sViar%20ATK!5e0!3m2!1sen!2sid!4v1721452800000!5m2!1sen!2sid"
            width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"
            className="w-full h-[350px] md:h-[400px] border-0"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <address className="not-italic text-gray-700 leading-relaxed">
          <strong>Toko Mie Ayam Maknyus</strong>
          <br />
          Viar ATK, Jl. Ringroad Selatan
          <br />
          Yogyakarta, Indonesia
          <br />
          <a
            href="https://www.google.com/maps?q=Viar+atk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700 inline-block mt-2"
          >
            Buka di Google Maps
          </a>
        </address>
      </div>
    </section>
  );
};

export default Location;

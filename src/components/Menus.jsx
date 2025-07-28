import ProductCard from "./ProductCard";
import { FaUtensils } from "react-icons/fa";

const Menus = ({ filtered }) => {
  return (
    <section className="px-4 py-24 overflow-hidden relative">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-red-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg mb-16">
        Daftar Menu Kami
      </h2>

      {filtered.length > 0 ? (
        <div className="overflow-x-auto w-full">
          <div className="flex gap-6 w-max px-2">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="min-w-[240px] max-w-[240px] flex-shrink-0"
              >
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-24">
          <FaUtensils className="text-[180px] mb-8 text-[#FB4141]" />
          <p className="text-3xl font-semibold text-gray-600">
            Menu tidak ditemukan. Coba cari yang lain ya~
          </p>
        </div>
      )}
    </section>
  );
};

export default Menus;

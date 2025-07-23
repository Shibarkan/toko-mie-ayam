import { useInView } from "react-intersection-observer";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

const CategorySection = ({
  title,
  items,
  cart,
  increment,
  decrement,
  setNote,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const icon = title === "makanan" ? "🍜" : title === "minuman" ? "🥤" : "🍟";

  return (
    <div className="mb-20" ref={ref}>
      <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 capitalize">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 items-stretch">
        {/* Gambar di kiri full tinggi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
        >
          <div className="relative">
            <div className="absolute top-3 left-3 bg-white bg-opacity-80 rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1 shadow">
              {icon} {title}
            </div>
            <img
              src="https://i.pinimg.com/736x/49/44/dc/4944dcc476f3ab84286632d35e9bc324.jpg"
              alt={`Kategori ${title}`}
              className="w-full object-cover max-h-60 sm:max-h-80 md:max-h-96 lg:max-h-[500px]"
            />
          </div>
          <div className="p-4 flex-grow flex items-center justify-center">
            <p className="text-sm text-gray-600 text-center">
              {title} di sebelah kanan kocak
            </p>
          </div>
        </motion.div>

        {/* Produk di kanan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-6"
        >
          {items.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              quantity={cart[product.id]?.quantity || 0}
              note={cart[product.id]?.note || ""}
              setNote={setNote}
              increment={() => increment(product.id)}
              decrement={() => decrement(product.id)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySection;

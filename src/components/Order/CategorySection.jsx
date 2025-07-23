// src/components/Order/CategorySection.jsx
import { useInView } from "react-intersection-observer";
import ProductItem from "./ProductItem";

const CategorySection = ({ title, items, cart, increment, decrement }) => {
  const { ref } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="mb-14" ref={ref}>
      <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 capitalize">
        {title === "makanan" && "🍜"}
        {title === "minuman" && "🥤"}
        {title === "cemilan" && "🍟"}
        <span className="ml-2">{title}</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-1 bg-white rounded-xl shadow p-4 flex justify-center items-center h-full">
          <img
            src="https://i.pinimg.com/736x/4d/89/4a/4d894ae7d925293f90b3aa7e5b3a316c.jpg"
            alt={`Kategori ${title}`}
            className="rounded-lg object-cover max-h-[250px]"
          />
        </div>

        <div className="md:col-span-2 space-y-4">
          {items.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              quantity={cart[product.id] || 0}
              increment={() => increment(product.id)}
              decrement={() => decrement(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;

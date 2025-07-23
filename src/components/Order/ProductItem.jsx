// src/components/Order/ProductItem.jsx
import { Plus, Minus } from "lucide-react";

const ProductItem = ({ product, quantity, increment, decrement }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4 w-full sm:w-2/3">
        <img
          src={product.gambar}
          alt={product.nama}
          className="w-20 h-20 rounded-xl object-cover"
        />
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold text-gray-800">{product.nama}</h4>
          <p className="text-[#FB4141] font-bold text-base">
            Rp {product.harga.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <button
          onClick={decrement}
          disabled={!quantity}
          className={`w-9 h-9 flex items-center justify-center rounded-full text-lg transition ${
            quantity ? "bg-[#FB4141] text-white" : "bg-gray-200 text-gray-400"
          }`}
        >
          <Minus size={18} />
        </button>
        <span className="text-xl font-bold w-6 text-center">{quantity}</span>
        <button
          onClick={increment}
          className="w-9 h-9 flex items-center justify-center bg-[#FB4141] text-white rounded-full hover:bg-[#e33333] transition"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;

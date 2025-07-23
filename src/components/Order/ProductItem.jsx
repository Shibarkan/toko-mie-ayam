// src/components/Order/ProductItem.jsx
import { Plus, Minus, MessageSquare } from "lucide-react";

const ProductItem = ({ product, quantity, increment, decrement, note, setNote }) => {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4">
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

      <div className="flex items-center gap-3 justify-end">
        <button
          onClick={decrement}
          disabled={!quantity}
          className={`w-9 h-9 flex items-center justify-center rounded-full text-lg transition ${
            quantity ? "bg-[#FB4141] text-white" : "bg-gray-200 text-gray-400"
          }`}
        >
          <Minus size={18} />
        </button>
        <span className="text-xl font-bold w-6 text-center">{quantity || 0}</span>
        <button
          onClick={increment}
          className="w-9 h-9 flex items-center justify-center bg-[#FB4141] text-white rounded-full hover:bg-[#e33333] transition"
        >
          <Plus size={18} />
        </button>
      </div>

      {quantity > 0 && (
        <div className="relative">
          <textarea
            placeholder="Catatan khusus (contoh: tanpa gula, extra pedas)"
            value={note || ""}
            onChange={(e) => setNote(product.id, e.target.value)}
            className="w-full border px-4 py-2 rounded-lg text-sm pr-10 focus:outline-none"
            rows={2}
          />
          <MessageSquare
            size={18}
            className="absolute top-2 right-3 text-gray-400"
          />
        </div>
      )}
    </div>
  );
};

export default ProductItem;

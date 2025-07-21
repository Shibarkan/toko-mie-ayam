import { useState } from "react";
import { Star } from "lucide-react"; // pastikan install lucide-react
import { motion } from "framer-motion";

const Testimoni = ({ visible, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (rating === 0 || review.trim() === "") {
      alert("Tolong isi rating dan testimoni terlebih dahulu.");
      return;
    }

    onSubmit({ rating, review });
    setRating(0);
    setReview("");
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-[#FB4141]">
          Beri Testimoni
        </h2>

        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={28}
              onClick={() => setRating(i)}
              className={`cursor-pointer ${
                i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <textarea
          rows={4}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#FB4141]"
          placeholder="Tulis pendapat kamu tentang Mie Ayam kami..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            className="px-4 py-2 rounded-md bg-[#FB4141] text-white hover:bg-[#e33333]"
            onClick={handleSubmit}
          >
            Kirim
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Testimoni;

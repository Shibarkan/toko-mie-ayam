import { useState, useEffect } from "react";

const AdminUpload = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("admin-products")) || [];
    setProducts(stored);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !image) return;

    const newProduct = { name, price, image };
    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem("admin-products", JSON.stringify(updated));

    setName("");
    setPrice("");
    setImage("");
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-red-500">Upload Produk</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama Makanan"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Harga"
          className="w-full p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Link Gambar"
          className="w-full p-2 border rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Upload
        </button>
      </form>

      {products.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Produk Upload:</h3>
          <ul className="grid grid-cols-2 gap-4">
            {products.map((p, i) => (
              <li key={i} className="border p-2 rounded shadow text-center">
                <img src={p.image} alt={p.name} className="h-24 object-cover w-full rounded" />
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-500">{p.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminUpload;

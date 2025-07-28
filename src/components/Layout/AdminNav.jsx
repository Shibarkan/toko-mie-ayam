const AdminNav = ({ active, onChange }) => {
  return (
    <nav className="w-64 bg-white border-r p-6 space-y-4 shadow-sm">
      <h1 className="text-2xl font-bold text-rose-600 mb-6">Admin Panel</h1>

      <button
        className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${
          active === "orders"
            ? "bg-rose-100 text-rose-700"
            : "hover:bg-gray-100 text-gray-700"
        }`}
        onClick={() => onChange("orders")}
      >
        Daftar Pembelian
      </button>

      {/* Tambahan navigasi bisa ditambah di sini */}
    </nav>
  );
};

export default AdminNav;

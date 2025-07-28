// src/components/Admin/AdminDashboard.jsx
import { useState } from "react";
import AdminOrders from "./AdminOrders";
import AdminUploadMenu from "./AdminUploadMenu";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("orders");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-rose-600">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem("isAdmin");
              window.location.href = "/";
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedTab("orders")}
            className={`px-4 py-2 rounded font-semibold ${
              selectedTab === "orders"
                ? "bg-rose-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Daftar Pembelian
          </button>
          <button
            onClick={() => setSelectedTab("upload")}
            className={`px-4 py-2 rounded font-semibold ${
              selectedTab === "upload"
                ? "bg-rose-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Upload Menu
          </button>
        </div>

        {selectedTab === "orders" && <AdminOrders />}
        {selectedTab === "upload" && <AdminUploadMenu />}
      </div>
    </div>
  );
};

export default AdminDashboard;

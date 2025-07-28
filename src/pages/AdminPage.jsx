import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/Admin/AdminDashboard";

const AdminPage = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin-login");
    } else {
      setIsChecking(false);
    }
  }, [navigate]);

  if (isChecking) return <p className="text-center mt-10">Checking admin...</p>;

  return <AdminDashboard />;
};

export default AdminPage;

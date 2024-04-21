import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import NavBarAdmin from "../components/Admin/NavBarAdmin";
import SideBarAdmin from "../components/Admin/SideBarAdmin";
import AppAdmin from "../components/Admin/AppAdmin";
import { AuthProvider } from "../context/AuthProvider";
import Productos from "../components/Admin/Productos";
import Usuarios from "../components/Admin/Usuarios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const AdminLayout = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.rol !== false) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <>
      <NavBarAdmin />
      <SideBarAdmin />
      <Routes>
        <Route path="/home" element={<AppAdmin />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Usuarios" element={<Usuarios />} />
      </Routes>
    </>
  );
};

export default AppRouter;

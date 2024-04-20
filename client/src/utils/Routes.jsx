import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import NavBarAdmin from "../components/Admin/NavBarAdmin";
import SideBarAdmin from "../components/Admin/SideBarAdmin";
import AppAdmin from "../components/Admin/AppAdmin";
import { AuthProvider } from "../context/AuthProvider";
import Productos from "../components/Admin/Productos";
import Usuarios from "../components/Admin/Usuarios";
import useAuth from "../hooks/useAuth";

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
  const { auth, setAuth } = useAuth();

  console.log(auth);
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

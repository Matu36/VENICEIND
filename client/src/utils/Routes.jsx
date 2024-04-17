import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import NavBarAdmin from "../components/Admin/NavBarAdmin";
import SideBarAdmin from "../components/Admin/SideBarAdmin";
import AppAdmin from "../components/Admin/AppAdmin";
import { AuthProvider } from "../context/AuthProvider";
import Productos from "../components/Admin/Productos";

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
  return (
    <>
      <NavBarAdmin />
      <SideBarAdmin />
      <Routes>
        <Route path="/home" element={<AppAdmin />} />
        <Route path="/Productos" element={<Productos />} />
      </Routes>
    </>
  );
};

export default AppRouter;

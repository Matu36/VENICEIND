import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Logout() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();

    setAuth({});

    window.location.reload();
  }, []);

  return <div>Cerrando sesión</div>;
}

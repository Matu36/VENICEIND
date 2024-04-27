import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

export default function Logout() {
  const { setAuth } = useAuth();

  useEffect(() => {
    localStorage.clear();

    setAuth({});

    window.location.reload();
  }, []);

  return <div>Cerrando sesión</div>;
}

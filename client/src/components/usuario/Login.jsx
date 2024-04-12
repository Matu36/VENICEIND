import React, { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import Registro from "./Registro";
import RecoverPass from "./RecoverPass";
import useAuth from "../../hooks/useAuth";

export default function Login({ handleCerrarModalLogin }) {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const [registro, setRegistro] = useState(false);
  const [recover, setRecover] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  const handleMostrarModalRegistro = () => {
    setRegistro(true);
  };

  const handleCerrarModalRegistro = () => {
    setRegistro(false);
  };

  const handleMostrarModalRecover = () => {
    setRecover(true);
  };

  const handleCerrarModalRecover = () => {
    setRecover(false);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    //Datos del formulario
    let userToLogin = form;

    //Peticion al backend

    const request = await fetch(Global.url + "usuarios/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      //Persistir los datos en el LocalStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.returnedUsers));
      setSaved("login");
      setShowWelcomeMessage(true);
    } else {
      setSaved("error");
    }
  };

  useEffect(() => {
    // Después de 3 segundos, ocultar el mensaje de bienvenida
    if (showWelcomeMessage) {
      const timer = setTimeout(() => {
        setShowWelcomeMessage(false);
        handleCerrarModalLogin();
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeMessage]);

  return (
    <div>
      {!registro && (
        <div className="login-container">
          <div className="button-close-login">
            <button onClick={handleCerrarModalLogin}>X</button>
          </div>

          <form className="login-form" onSubmit={loginUser}>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" name="email" onChange={changed} />
            </div>
            <div className="form-group">
              <label htmlFor="contraseña">Contraseña</label>
              <input type="text" name="password" onChange={changed} />
            </div>
            <button onClick={handleMostrarModalRecover}>
              <span style={{ color: "blue" }}>¿Olvidaste tu contraeña?</span>
            </button>
            <strong style={{ color: "grey" }}>
              {saved === "error"
                ? "El usuario no pertenece a Comunidad Venice"
                : null}
            </strong>

            <input type="submit" value="Ingresar" className="btn btn-success" />
          </form>
          {recover && (
            <div className="modal">
              <div className="modal-content">
                <RecoverPass
                  handleCerrarModalRecover={handleCerrarModalRecover}
                />
              </div>
            </div>
          )}

          {showWelcomeMessage && (
            <div className="welcome-message">
              <img
                src="https://res.cloudinary.com/dmfzplfra/image/upload/v1711678602/VENICE/LOGO_1-removebg-preview_j1tfcu.png"
                alt=""
              />
              <p>Bienvenido a Comunidad Venice!</p>
            </div>
          )}
          <span style={{ color: "blue" }}>
            ¿Aún no pertenecés a Comunidad Venice?
          </span>
          <button onClick={handleMostrarModalRegistro}>Registráte</button>
        </div>
      )}

      {registro && (
        <div>
          <Registro handleCerrarModalRegistro={handleCerrarModalRegistro} />
        </div>
      )}
    </div>
  );
}

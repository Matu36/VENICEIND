import React, { useState } from "react";
import { Global } from "../../helpers/Global";

const RecoverPass = ({ handleCerrarModalRecover }) => {
  const [email, setEmail] = useState("");

  const resetPassword = async (email) => {
    try {
      const response = await fetch(Global.url + "usuarios/recoverpass", {
        method: "PUT",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Contraseña restablecida con éxito");
      } else {
        console.error("Error al restablecer la contraseña:", data.message);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(email);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="registro-container">
      <div className="button-close-login">
        <button onClick={handleCerrarModalRecover}>X</button>
      </div>
      <h3 className="spanemail">Ingresá tu Email</h3>
      <form onSubmit={handleSubmit} className="formrecover">
        <input
          className="recover"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          placeholder="Ingresa tu correo electrónico"
          required
        />
        <button className="buttonrecover" type="submit">
          Restablecer contraseña
        </button>
      </form>
    </div>
  );
};

export default RecoverPass;

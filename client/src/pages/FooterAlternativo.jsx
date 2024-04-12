import React from "react";
import mercadoPago from "../assets/img/logos/mercadopago.png";

export default function FooterAlternativo({
  handleMostrarModalContact,
  handleMostrarModalAbout,
}) {
  return (
    <div className="principal-footer">
      <div className="footerAlternativo">
        <div className="faSpan">
          <h2>Contactános</h2>

          <p>
            ¡Gracias por visitar nuestro sitio! Si tienes alguna pregunta o
            comentario, no dudes en ponerte en contacto con nosotros.
          </p>
        </div>

        <div className="footaltbespace">
          {" "}
          <div>
            <button onClick={handleMostrarModalAbout}>Nosotros</button>
          </div>
          <div>
            <button onClick={handleMostrarModalContact}>Contacto</button>
          </div>
        </div>
      </div>
      <div className="marca">
        <h3 style={{ color: "black" }}>Aceptamos</h3>
        <img src={mercadoPago} alt="mp" />
        <h4 style={{ color: "black" }}>Transferencia / Depósito bancario</h4>
      </div>
    </div>
  );
}

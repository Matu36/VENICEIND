import React, { useState } from "react";

export default function CardAmpliada({
  imagen,
  imagen2,
  precio,
  talle,
  onClose,
}) {
  const [currentImage, setCurrentImage] = useState(imagen);

  const handleMouseOver = () => {
    setCurrentImage(imagen2);
  };

  const handleMouseOut = () => {
    setCurrentImage(imagen);
  };

  const handleTouchStart = () => {
    setCurrentImage(imagen2);
  };

  const handleTouchEnd = () => {
    setCurrentImage(imagen);
  };

  return (
    <div
      className="CardAmpliada"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button onClick={onClose} style={{ color: "black" }}>
        X
      </button>
      <img src={currentImage} alt="Imagen ampliada" />
      <div>
        <span style={{ color: "black", fontWeight: "bold" }}>
          Precio: $ {precio}
        </span>
      </div>
      <span style={{ color: "black", fontWeight: "bold" }}>
        {" "}
        {talle && <p>Talle: {talle}</p>}
      </span>
    </div>
  );
}

import React, { useState } from "react";
import CardAmpliada from "./CardAmpliada";
import soldout from "../assets/img/soldOut.png";
import { useNavigate } from "react-router-dom";
const Card = ({
  id,
  marca,
  nombre,
  talle,
  precio,
  imagen,
  cantidadTotal,
  imagen1,
  codigo,
  actualizarContadorCarrito,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [currentImage, setCurrentImage] = useState(imagen);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleDetalleClick = () => {
    navigate(`/productos/${id}`);
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleMouseOver = () => {
    setCurrentImage(imagen1);
  };

  const handleMouseOut = () => {
    setCurrentImage(imagen);
  };

  const handleTouchStart = () => {
    setCurrentImage(imagen1);
  };

  const handleTouchEnd = () => {
    setCurrentImage(imagen);
  };

  const handleComprarClick = () => {
    const productoComprado = {
      id,
      marca,
      nombre,
      talle,
      precio,
      imagen,
      codigo,
    };

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push(productoComprado);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    actualizarContadorCarrito();
  };

  const talleLetras = talle
    .split(",")
    .map((item) => item.split(":")[0].trim())
    .join(" - ");

  return (
    <div
      className="card"
      id={id}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {showModal && (
        <div className="modal1">
          <div className="modal-content1">
            <CardAmpliada
              talle={talle}
              precio={precio}
              imagen={imagen}
              imagen1={imagen1}
              cantidadTotal={cantidadTotal}
              onClose={closeModal}
            />
          </div>
        </div>
      )}
      <img
        src={currentImage}
        alt=""
        className="card-image"
        onClick={handleImageClick}
      />

      <div className="card-content">
        <p>{marca ? marca : null} </p>
        <p>{nombre ? nombre : null} </p>
        <p>Talle: {talleLetras}</p>

        <p>Precio: $ {precio}</p>
        <p style={{ color: "grey", fontSize: "10px", marginTop: "10px" }}>
          Código: {codigo}
        </p>
        <button
          style={{ background: "none", color: "chocolate" }}
          onClick={handleDetalleClick}
        >
          Ver detalle
        </button>

        {cantidadTotal === 0 && (
          <div className="soldOut-container">
            {" "}
            <span className="soldOut">SIN STOCK</span>
          </div>
        )}
      </div>

      <br />
      <div>
        <button
          className={`comprar ${cantidadTotal === 0 ? "sin-stock" : "comprar"}`}
          onClick={handleComprarClick}
          disabled={cantidadTotal === 0}
        >
          Añadir al Carrito
        </button>
      </div>
      {showAlert && (
        <div className="alert-container">
          <div className="alert-message">
            El producto ha sido añadido al carrito
          </div>
        </div>
      )}
    </div>
  );
};
export default Card;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Detalle() {
  const [producto, setProducto] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}productos/${id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]);

  return (
    <div>
      {producto ? (
        <div>
          <h2>{producto.nombre}</h2>
          <p>Marca: {producto.marca}</p>
          <p>Precio: {producto.precio}</p>
          <p>Código: {producto.codigo}</p>
          <p>Talle: {producto.talle}</p>
          {/* Aquí puedes agregar más detalles del producto */}
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}

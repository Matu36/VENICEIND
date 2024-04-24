import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
    <div className="DetalleCardContainer">
      {producto ? (
        <div className="DetalleCard">
          <h2>{producto.nombre}</h2>
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 1,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 1,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            <img src={producto.imagen} className="CarrouselImg" alt="" />
            <img src={producto.imagen1} className="CarrouselImg" alt="" />
            <img src={producto.imagen2} className="CarrouselImg" alt="" />
            <img src={producto.imagen3} className="CarrouselImg" alt="" />
          </Carousel>

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
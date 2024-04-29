import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Layout from "../pages/Layout";
import Card from "./Card";

const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}productos`, {
  method: "GET",
  body: JSON.stringify(),
  headers: {
    "Content-type": "application/json",
  },
});

const data = await request.json();

export default function Detalle() {
  const [producto, setProducto] = useState(null);
  const { id } = useParams();
  const [selectedMarca, setSelectedMarca] = useState("");
  const cardsContainerRef = useRef(null);
  const carouselRef = useRef(null);

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

        const tallesDisponibles = data.talle
          .split(", ")
          .map((item) => item.split(":"))
          .filter(([talle, cantidad]) => parseInt(cantidad) > 0)
          .map(([talle]) => talle);

        const productoFiltrado = {
          ...data,
          talle: tallesDisponibles.join(", "),
        };
        setProducto(productoFiltrado);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]);

  const filteredCamisas = data.filter((camisa) => {
    if (selectedMarca === "Todas las marcas") {
      return true;
    }

    return camisa.marca === selectedMarca;
  });

  const handleSearchByMarca = (marca) => {
    const marcaNormalized =
      marca.charAt(0).toUpperCase() + marca.slice(1).toLowerCase();
    setSelectedMarca(marcaNormalized);

    setTimeout(() => {
      const firstCard = cardsContainerRef.current.querySelector(".card");
      firstCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const scrollToCarousel = () => {
    carouselRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout onSearchByMarca={handleSearchByMarca}>
      <div className="blue-bar">
        <p>Indumentaria de Calidad</p>
      </div>
      <div className="brown-bar">
        <p>Remeras para Hombre</p>
      </div>

      <div
        ref={carouselRef}
        id="carouselContainer"
        className="DetalleCardContainer"
      >
        {producto ? (
          <div className="DetalleCard">
            <span className="detalleMarca">{producto.marca}</span>
            <Carousel
              additionalTransfrom={0}
              arrows={false}
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
              {producto.imagen3 ? (
                <img src={producto.imagen3} className="CarrouselImg" alt="" />
              ) : null}
            </Carousel>
            <div className="precioDetalle">
              <span>$ {producto.precio.toLocaleString()}</span>
            </div>
            <hr className="hrPersonalizado" />
            <div className="tallesTitle">
              <span>Talles</span>
            </div>
            <div className="tallesDetalle">
              {producto.talle.split(", ").map((talle, index) => (
                <span key={index} className="circuloTalle">
                  {talle}
                </span>
              ))}
            </div>
            <div ref={cardsContainerRef} className="cards-container" id="card">
              {filteredCamisas.map((camisa) => (
                <Card
                  id="cards"
                  key={camisa.id}
                  {...camisa}
                  scrollToCarousel={scrollToCarousel}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>Cargando...</div>
        )}
      </div>
    </Layout>
  );
}

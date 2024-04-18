import { useState, useEffect, useRef } from "react";
import NavBar from "./components/Navbar";
import Contact from "./components/Contact";
import { camisas } from "../src/utils/Camisas";
import Card from "./components/Card";
import AboutUs from "./components/AboutUs";
import CarritoModal from "./components/CarritoModal";
import VENICEEXPERIENCE from "../src/assets/img/rubiofrase.png";
import Filtros from "./components/Filtros";
import FooterAlternativo from "./pages/FooterAlternativo";
import { Slide, toast } from "react-toastify";
import CargandoStock from "./components/CargandoStock";
import Videos from "./components/Videos";
import NavBarAlternativo from "../src/components/NavBarAlternativo";
import Login from "./components/usuario/Login";
import useAuth from "./hooks/useAuth";
import EditarUsuario from "./components/usuario/EditarUsuario";

function App() {
  const [selectedMarca, setSelectedMarca] = useState();
  const [filtroPrecio, setFiltroPrecio] = useState();
  const [filtroPrecioTodos, setFiltroPrecioTodos] = useState("");
  const [filtroTalle, setFiltroTalle] = useState("");
  const [modal, setModal] = useState(false);
  const [modalCarrito, setModalCarrito] = useState(false);
  const [carritoC, setCarritoC] = useState(0);
  const [contact, setContact] = useState(false);
  const cardsContainerRef = useRef(null);
  const { auth, setAuth } = useAuth();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, [setAuth]);

  const [login, setLogin] = useState(false);

  useEffect(() => {
    toast.info("Prendas 100% ORIGINALES", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      newestOnTop: false,
      closeOnClick: false,
      rtl: false,
      draggable: true,
      transition: Slide,
      pauseOnHover: true,
      pauseOnFocusLoss: false,
      closeButton: false,
      icon: false,
      theme: "dark",
    });
  }, []);

  const filtrarPorTalleYPrecio = () => {
    let camisasFiltradas = camisas;

    // Aplicar filtro por talle
    if (filtroTalle) {
      camisasFiltradas = camisasFiltradas.filter((camisa) => {
        // Verificar si talle es una cadena o una matriz
        if (typeof camisa.talle === "string") {
          // Si es una cadena, dividirla en una matriz
          const tallesDisponibles = camisa.talle
            .split(", ")
            .map((talle) => talle.trim());
          // Verificar si alguna de las tallas disponibles incluye el filtroTalle
          return tallesDisponibles.includes(filtroTalle.trim());
        } else {
          // Si es una matriz, buscar directamente
          return camisa.talle.some((talleGrupo) => {
            const tallesDisponibles = talleGrupo
              .split(", ")
              .map((talle) => talle.trim());
            return tallesDisponibles.includes(filtroTalle.trim());
          });
        }
      });
    }

    // Aplicar filtro por precio si está definido
    if (filtroPrecioTodos) {
      camisasFiltradas = camisasFiltradas.filter((camisa) => {
        if (filtroPrecioTodos === "menorPrecio" && camisa.precio >= 0) {
          return true;
        } else if (filtroPrecioTodos === "mayorPrecio" && camisa.precio > 0) {
          return true;
        }
        return false;
      });
    }

    // Ordenar todas las camisas filtradas por precio
    camisasFiltradas.sort((a, b) => {
      if (filtroPrecioTodos === "menorPrecio") {
        return a.precio - b.precio;
      } else if (filtroPrecioTodos === "mayorPrecio") {
        return b.precio - a.precio;
      } else {
        return 0;
      }
    });

    return filtroTalle || filtroPrecioTodos ? camisasFiltradas : [];
  };

  const talle = filtrarPorTalleYPrecio();
  const limpiarFiltros = () => {
    setFiltroTalle("");
    setFiltroPrecioTodos("");
  };

  const filteredCamisas = camisas.filter((camisa) => {
    if (selectedMarca === "Todas las marcas") {
      return true;
    }

    return camisa.marca === selectedMarca;
  });

  if (filtroPrecio === "menorPrecio") {
    filteredCamisas.sort((a, b) => a.precio - b.precio);
  }

  if (filtroPrecio === "mayorPrecio") {
    filteredCamisas.sort((a, b) => b.precio - a.precio);
  }

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoCount = carrito.length;

  const actualizarContadorCarrito = () => {
    const carritoActualizado =
      JSON.parse(localStorage.getItem("carrito")) || [];
    const count = carritoActualizado.length;
    setCarritoC(count);
  };

  const handleMostrarModalCarrito = () => {
    setModalCarrito(true);
    actualizarContadorCarrito();
  };

  const handleCerrarModalCarrito = () => {
    setModalCarrito(false);
    actualizarContadorCarrito();
  };

  const handleMostrarModalLogin = () => {
    setLogin(true);
  };

  const handleCerrarModalLogin = () => {
    setLogin(false);
  };

  const handleMostrarModalEdit = () => {
    setEdit(true);
  };

  const handleCerrarModalEdit = () => {
    setEdit(false);
  };

  const handleInicioClick = () => {
    setSelectedMarca(null);
  };

  const handleMostrarModalAbout = () => {
    setModal(true);
  };

  const handleCerrarModalAbout = () => {
    setModal(false);
  };

  const handleMostrarModalContact = () => {
    setContact(true);
  };

  const handleCerrarModalContact = () => {
    setContact(false);
  };

  useEffect(() => {
    actualizarContadorCarrito();
  }, []);

  const [showLoading, setShowLoading] = useState(true);

  const closeLoading = () => {
    setShowLoading(false);
  };

  const handleSearchByMarca = (marca) => {
    const marcaNormalized =
      marca.charAt(0).toUpperCase() + marca.slice(1).toLowerCase();
    setSelectedMarca(marcaNormalized);

    setTimeout(() => {
      const firstCard = cardsContainerRef.current.querySelector(".card");
      firstCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <div className="container">
      {modalCarrito && (
        <div>
          <CarritoModal
            handleCerrarModalCarrito={handleCerrarModalCarrito}
            actualizarContadorCarrito={actualizarContadorCarrito}
          />
        </div>
      )}

      {login && (
        <div>
          <Login
            handleMostrarModalLogin={handleMostrarModalLogin}
            handleCerrarModalLogin={handleCerrarModalLogin}
          />
        </div>
      )}
      {edit && (
        <div>
          <EditarUsuario
            handleMostrarModalEdit={handleMostrarModalEdit}
            handleCerrarModalEdit={handleCerrarModalEdit}
          />
        </div>
      )}
      <NavBarAlternativo
        handleMostrarModalCarrito={handleMostrarModalCarrito}
        carritoC={carritoC}
        handleSearchByMarca={handleSearchByMarca}
        handleMostrarModalLogin={handleMostrarModalLogin}
        handleMostrarModalEdit={handleMostrarModalEdit}
      />
      {/* {showLoading && <CargandoStock onClose={closeLoading} />} */}
      <div>
        <Videos />
      </div>

      {!filteredCamisas.length > 0 && (
        <div className="frasemarcas">
          <h2>NUESTRAS MARCAS DESTACADAS</h2>
        </div>
      )}
      {!filteredCamisas.length > 0 && (
        <div className="filtrosTodos">
          <h4>Filtrá por talle o precio</h4>
          <select
            value={filtroTalle}
            onChange={(e) => setFiltroTalle(e.target.value)}
          >
            <option value="">Por Talle</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          <select
            value={filtroPrecioTodos}
            onChange={(e) => setFiltroPrecioTodos(e.target.value)}
          >
            <option value="">Por Precio</option>
            <option value="menorPrecio">Menor Precio</option>
            <option value="mayorPrecio">Mayor Precio</option>
          </select>
          <button value="limpiarTodo" onClick={() => limpiarFiltros()}>
            Omitir Filtros
          </button>
        </div>
      )}
      <div className="eleganzaContainer">
        <div className="navBarDiv">
          {!filteredCamisas.length > 0 && !talle.length > 0 && (
            <h3 style={{ color: "black" }}>
              <span>Seleccioná alguna de nuestras Marcas</span>
            </h3>
          )}
          {!filteredCamisas.length > 0 && !talle.length > 0 && (
            <NavBar
              onSelectMarca={setSelectedMarca}
              onInicio={handleInicioClick}
            />
          )}
        </div>
      </div>

      <div>
        {filteredCamisas.length > 0 && (
          <div className="top-bar">
            <div>
              <Filtros
                filtroPrecio={filtroPrecio}
                setFiltroPrecio={setFiltroPrecio}
                selectedMarca={selectedMarca}
                setSelectedMarca={setSelectedMarca}
              />
            </div>

            <div>
              <h3>VENICE INDUMENTARIA</h3>
            </div>
            <div>
              <button className="buttonclose" onClick={handleInicioClick}>
                X
              </button>
            </div>
          </div>
        )}

        <div ref={cardsContainerRef} className="cards-container" id="card">
          {filteredCamisas.map((camisa) => (
            <Card
              id="cards"
              key={camisa.id}
              {...camisa}
              actualizarContadorCarrito={actualizarContadorCarrito}
            />
          ))}
        </div>
        {!filteredCamisas.length > 0 && (
          <div className="cards-container" id="card">
            {talle.map((camisa) => (
              <Card
                id="cards"
                key={camisa.id}
                {...camisa}
                actualizarContadorCarrito={actualizarContadorCarrito}
              />
            ))}
          </div>
        )}
      </div>

      {/* <div className="frase">California dressing</div> */}

      <div className="camisasContainer">
        <img src={VENICEEXPERIENCE} alt="camisas" className="camisasImg" />
      </div>

      <FooterAlternativo
        handleMostrarModalContact={handleMostrarModalContact}
        handleMostrarModalAbout={handleMostrarModalAbout}
      />

      {contact && (
        <div className="modal">
          {/* <div className="modal-content"> */}
          <Contact handleCerrarModalContact={handleCerrarModalContact} />
          {/* </div> */}
        </div>
      )}
      {modal && (
        <div className="modal">
          {/* <div className="modal-content"> */}
          <AboutUs handleCerrarModalAbout={handleCerrarModalAbout} />
          {/* </div> */}
        </div>
      )}
      <hr style={{ color: "grey", maxWidth: "100%" }} />
      <span className="copy">
        Copyright © 2024 | Venice Indumentaria Todos los derechos reservados
      </span>
    </div>
  );
}
export default App;

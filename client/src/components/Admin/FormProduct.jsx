import React, { useState } from "react";
import Swal from "sweetalert2";

const Clouddinary = import.meta.env.VITE_CLOUDINARY_URL;

export default function FormProduct() {
  //CLOUDDINARY//

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Images"); //VENICE es el folder que cree en cDinary
    setLoading(true);
    const res = await fetch(Clouddinary, {
      method: "POST",
      body: data,
    });

    const file = await res.json();
    console.log(res);
    setImage(file.secure_url);
    setLoading(false);
    setProducto({
      ...producto,
      imagen: file.secure_url,
      imagen1: file.secure_url,
      imagen2: file.secure_url,
      imagen3: file.secure_url,
    });
  };

  //CLOUDDINARY//

  //CREACION DE PRODUCTO //
  const [producto, setProducto] = useState({
    marca: "",
    imagen: "",
    imagen1: "",
    cantidadTotal: "",
    precio: "",
    codigo: "",
    talle: "",
  });

  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      const request = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}productos/create`,
        {
          method: "POST",
          body: JSON.stringify(producto),
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await request.json();
      console.log("Producto creado:", data);

      // Mostrar SweetAlert de éxito
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "El producto ha sido creado",
        showConfirmButton: false,
        timer: 2000, // 2 segundos
      });

      // Limpiar el formulario después de crear el producto
      setProducto({
        marca: "",
        imagen: "",
        imagen1: "",
        imagen2: "",
        imagen3: "",
        cantidadTotal: "",
        precio: "",
        codigo: "",
        talle: "",
      });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      // Mostrar SweetAlert de error
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un error al crear el producto",
        showConfirmButton: false,
        timer: 2000, // 2 segundos
      });
    }
  };

  //FIN EDITAR COSTOS

  return (
    <div>
      <form onSubmit={saveProduct}>
        <div>
          <div>
            <label style={{ color: "black" }} htmlFor="marca">
              Marca
            </label>
            <input
              type="text"
              id="marca"
              name="marca"
              value={producto.marca}
              autoComplete="off"
              placeholder="Marca"
              onChange={(e) =>
                setProducto({ ...producto, marca: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="precio">Precio</label>
            {/* <select */}
            <input
              id="precio"
              name="precio"
              type="number"
              value={producto.precio}
              onChange={(e) =>
                setProducto({
                  ...producto,
                  precio: parseInt(e.target.value) || "",
                })
              }
              placeholder="Precio"
            />
            {/* {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select> */}
          </div>

          <div>
            <label htmlFor="codigo">Código</label>
            <div>
              <input
                type="text"
                id="codigo"
                name="codigo"
                value={producto.codigo}
                autoComplete="off"
                placeholder="Código"
                onChange={(e) =>
                  setProducto({ ...producto, codigo: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="talle">Talle</label>
            <div>
              <input
                type="text"
                id="talle"
                name="talle"
                value={producto.talle}
                autoComplete="off"
                placeholder="Talle"
                onChange={(e) =>
                  setProducto({ ...producto, talle: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="imagen">Imagen</label>
            <input
              type="file"
              id="imagen"
              name="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={uploadImage}
            />
          </div>
          <div>
            <label htmlFor="imagen">Imagen 1</label>
            <input
              type="file"
              id="imagen1"
              name="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={uploadImage}
            />
          </div>
          <div>
            <label htmlFor="imagen">Imagen 2</label>
            <input
              type="file"
              id="imagen2"
              name="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={uploadImage}
            />
          </div>
          <div>
            <label htmlFor="imagen">Imagen 3</label>
            <input
              type="file"
              id="imagen3"
              name="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={uploadImage}
            />
          </div>

          <div>
            <label htmlFor="cantidadTotal">Cantidad Toal</label>
            <div>
              <input
                type="number"
                id="cantidadTotal"
                name="cantidadTotal"
                value={producto.cantidadTotal}
                autoComplete="off"
                placeholder="Cantidad Total"
                onChange={(e) =>
                  setProducto({
                    ...producto,
                    cantidadTotal: parseInt(e.target.value) || "",
                  })
                }
              />
            </div>
          </div>

          <div>
            <button type="submit">Agregar Producto</button>
          </div>
        </div>
      </form>
    </div>
  );
}

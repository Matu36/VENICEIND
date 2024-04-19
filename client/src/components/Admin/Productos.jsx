import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import FormProduct from "./FormProduct";
import Swal from "sweetalert2";
import { MdModeEdit } from "react-icons/md";

const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}productos`, {
  method: "GET",
  body: JSON.stringify(),
  headers: {
    "Content-type": "application/json",
  },
});

const data = await request.json();

export default function Productos() {
  const [search, setSearch] = useState("");
  const [productos, setProductos] = useState(data);

  //MOSTRANDO EL FORMULARIO DE CREACION //

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  function handleMostrarFormulario() {
    setMostrarFormulario(true);
  }

  function handleCerrarFormulario() {
    setMostrarFormulario(false);
  }

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByCodOrMarca(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByCodOrMarca = (value) => {
    if (!value) {
      setProductos(data);
    } else {
      const arrayCache = data.filter(
        (oper) =>
          oper.marca.toLowerCase().includes(value.toLowerCase()) ||
          oper.codigo.toLowerCase().includes(value.toLowerCase())
      );
      setProductos(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  const isEditing = (id) => id === editIndex;
  const columns = [
    { name: "Marca", selector: (row) => row.marca, sortable: true },
    { name: "Codigo", selector: (row) => row.codigo, sortable: true },
    {
      name: "Precio",
      cell: (row) =>
        editIndex === row.id ? (
          <input
            type="number"
            value={editPrice !== null ? editPrice : row.precio}
            onChange={(e) => handlePriceChange(e.target.value)}
          />
        ) : (
          row.precio
        ),
      sortable: true,
    },
    {
      name: "Talle",
      cell: (row) =>
        editIndex === row.id ? (
          <input
            type="text"
            value={editTalle !== null ? editTalle : row.talle}
            onChange={(e) => handleTalleChange(e.target.value)}
          />
        ) : (
          row.talle
        ),
      sortable: true,
    },
    {
      name: "Cantidad Total",
      cell: (row) =>
        editIndex === row.id ? (
          <input
            type="number"
            value={
              editCantidadTotal !== null ? editCantidadTotal : row.cantidadTotal
            }
            onChange={(e) => handleCantidadTotalChange(e.target.value)}
          />
        ) : (
          row.cantidadTotal
        ),
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          {isEditing(row.id) ? (
            <>
              <button onClick={() => handleSave(row.id)}>Guardar</button>
              <button onClick={() => handleCancel()}>Cancelar</button>
            </>
          ) : (
            <MdModeEdit
              onClick={() =>
                handleEdit(row.id, row.talle, row.precio, row.cantidadTotal)
              }
            />
          )}
        </div>
      ),
    },
  ];

  const [editIndex, setEditIndex] = useState(null);
  const [editPrice, setEditPrice] = useState(null);
  const [editTalle, setEditTalle] = useState(null);
  const [editCantidadTotal, setEditCantidadTotal] = useState(null);

  const handleEdit = (id, talle, precio, cantidadTotal) => {
    setEditIndex(id);
    setEditPrice(precio);
    setEditTalle(talle);
    setEditCantidadTotal(cantidadTotal);
  };

  const handlePriceChange = (precio) => {
    setEditPrice(precio);
  };

  const handleTalleChange = (talle) => {
    setEditTalle(talle);
  };

  const handleCantidadTotalChange = (cantidadTotal) => {
    setEditCantidadTotal(cantidadTotal);
  };

  const handleSave = async (id) => {
    try {
      if (
        editPrice !== null ||
        editTalle !== null ||
        editCantidadTotal !== null
      ) {
        const updatedProduct = {
          id: id,
          precio: editPrice,
          talle: editTalle,
          cantidadTotal: editCantidadTotal,
        };
        await saveData(updatedProduct, "productos/edit");
      }
      setEditIndex(null);
      setEditPrice(null);
      setEditTalle(null);
      setEditCantidadTotal(null);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      // Mostrar SweetAlert de error
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un error al guardar los cambios",
        showConfirmButton: false,
        timer: 2000, // 2 segundos
      });
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditPrice(null);
    setEditTalle(null);
    setEditCantidadTotal(null);
  };

  const saveData = async (data, endpoint) => {
    const request = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const responseData = await request.json();
    console.log("Datos guardados:", responseData);
  };

  return (
    <>
      <div className="productos">
        <div
          className="input-group mb-3 inputSearch"
          style={{ maxWidth: "40%" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por CODIGO O MARCA"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
            disabled={!data}
          />
        </div>
        <button onClick={handleMostrarFormulario}>Agregar Producto</button>

        {mostrarFormulario && (
          <div
            style={{
              position: "fixed",
              top: "45%",
              left: "45%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "black",
              padding: "10px",
              zIndex: "999",
            }}
          >
            <button fontSize="2rem" onClick={handleCerrarFormulario}>
              x
            </button>
            <FormProduct />
          </div>
        )}
        <DataTable columns={columns} data={productos} pagination striped />
      </div>
    </>
  );
}

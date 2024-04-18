import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Spinner from "../../UI/Spinner";

const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}productos`, {
  method: "GET",
  body: JSON.stringify(),
  headers: {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

const data = await request.json();

export default function Productos() {
  const [search, setSearch] = useState("");
  const [productos, setProductos] = useState(data);

  console.log(productos);

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

  const columns = [
    { name: "Marca", selector: (row) => row.marca, sortable: true },
    { name: "Codigo", selector: (row) => row.codigo, sortable: true },
    { name: "Precio", selector: (row) => row.precio, sortable: true },
    {
      name: "Talle",
      cell: (row) => {
        const talleInfo = [];
        if (row.talle.L) {
          talleInfo.push(`L: ${row.talle.L}`);
        }
        if (row.talle.XL) {
          talleInfo.push(`XL: ${row.talle.XL}`);
        }
        if (row.talle.M) {
          talleInfo.push(`M: ${row.talle.M}`);
        }
        return talleInfo.join(", ");
      },
      sortable: true,
    },
    // {
    //   name: "Ver",
    //   cell: (row) => (
    //     <Link to={`/agentes/agente/${row.id}`} className="custom-link">
    //       <button className="detalle"> + Información</button>
    //     </Link>
    //   ),
    // },
  ];

  return (
    <>
      <div>
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

        <DataTable columns={columns} data={productos} pagination striped />
      </div>
    </>
  );
}

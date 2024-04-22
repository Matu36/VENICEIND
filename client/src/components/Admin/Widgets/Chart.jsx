import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}usuarios/all`, {
  method: "GET",
  body: JSON.stringify(),
  headers: {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

const data = await request.json();

const allUsers = data.allUsers;

export default function Chart({ title, dataKey, grid }) {
  const usuarios = allUsers;

  const usuariosPorMes = {
    ene: [],
    feb: [],
    mar: [],
    abr: [],
    may: [],
    jun: [],
    jul: [],
    ago: [],
    sep: [],
    oct: [],
    nov: [],
    dic: [],
  };

  // Agrupar usuarios por mes
  const usuariosAgrupados = usuarios.reduce((acumulador, usuario) => {
    const fecha = new Date(usuario.createdAt);
    const mes = fecha.toLocaleString("default", { month: "short" });
    const mesAbreviado = mes.slice(0, 3); // Obtener las primeras tres letras del nombre del mes
    const anio = fecha.getFullYear();

    const clave = `${mesAbreviado}-${anio}`;

    if (!acumulador[clave]) {
      acumulador[clave] = [];
    }
    acumulador[clave].push(usuario);
    return acumulador;
  }, {});

  // Agregar usuarios agrupados a los meses correspondientes
  Object.keys(usuariosPorMes).forEach((mes) => {
    const anioActual = new Date().getFullYear();
    const clave = `${mes}-${anioActual}`;
    usuariosPorMes[mes] = usuariosAgrupados[clave] || [];
  });

  //Esto adecua el array de usuarios por mes al formato del dataKey
  const data = [];
  for (const [key, value] of Object.entries(usuariosPorMes)) {
    data.push({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      "Active User": value.length,
    });
  }

  return (
    <div>
      <span>{title}</span>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} />
          <Tooltip />
          {grid && <CartesianGrid />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

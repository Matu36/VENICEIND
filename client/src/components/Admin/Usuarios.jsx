import React from "react";

const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}usuarios/all`, {
  method: "GET",
  body: JSON.stringify(),
  headers: {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

const data = await request.json();

console.log(data);

export default function Usuarios() {
  return (
    <div>
      {/* {AllUsers ? (
        <ul>
          {AllUsers.map((allUsers) => (
            <li key={allUsers.id}>{allUsers.name}</li> // Supongamos que name es una propiedad de cada usuario
          ))}
        </ul>
      ) : (
        <p>No hay usuarios disponibles.</p>
      )} */}
    </div>
  );
}

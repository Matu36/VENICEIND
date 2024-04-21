import React from "react";
import useAuth from "../../hooks/useAuth";

export default function Usuarios() {
  const { allUsers } = useAuth();
  console.log(allUsers);
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

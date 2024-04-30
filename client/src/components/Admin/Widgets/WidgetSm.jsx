import React from "react";
import imgUsuarios from "../../../assets/img/logos/usuarios.jpg";
import { useUsuario } from "../../../hooks/useUsuarios";

// const request = await fetch(
//   `${import.meta.env.VITE_BACKEND_URL}usuarios/lastFive`,
//   {
//     method: "GET",
//     body: JSON.stringify(),
//     headers: {
//       "Content-type": "application/json",
//     },
//   }
// );

// const data = await request.json();

// const lastUsers = data.lastLoggedInUsers;

export default function WidgetSm() {
  const { data, isLoading } = useUsuario().fiveQuery;

  const lastUsers = data?.lastLoggedInUsers;

  return (
    <div className="userListContainer">
      <span>Últimos usuarios registrados</span>
      <table>
        {lastUsers?.map((user) => (
          <div key={user.id}>
            <div className="userListItem">
              <img src={imgUsuarios} className="imgUsuario" />
              <div>
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        ))}
      </table>
    </div>
  );
}

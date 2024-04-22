import React from "react";
import imgUsuarios from "../../../assets/img/logos/usuarios.jpg";

const request = await fetch(
  `${import.meta.env.VITE_BACKEND_URL}usuarios/lastFive`,
  {
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "Content-type": "application/json",
    },
  }
);

const data = await request.json();

const lastUsers = data.lastLoggedInUsers;

export default function WidgetSm() {
  return (
    <div>
      <span>Últimos usuarios registrados</span>
      <table>
        {lastUsers.map((user) => (
          <li key={user.id}>
            <div>
              <img src={imgUsuarios} className="imgUsuario" />
              <div>
                <span>{user.email}</span>
              </div>
            </div>
          </li>
        ))}
      </table>
    </div>
  );
}

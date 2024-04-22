import React, { useState, useEffect } from "react";

export default function WidgetLg() {
  const [cargos, setCargos] = useState([]);

  return (
    <div>
      <span>Últimas ventas realizadas</span>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Precio</th>
            <th>Producto</th>
          </tr>
        </thead>
        <tbody>
          {/* {VentasSlice.map((venta) => (
            <tr key={venta.id}>
              <td
               
              >
                {venta.metadata.user_email}
              </td>
              <td>${venta.amount}</td>
              <td style={{ wordBreak: "break-all" }}></td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

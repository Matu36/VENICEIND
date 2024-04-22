import React, { useState, useEffect } from "react";

export default function FeaturedInfo() {
  const [cargos, setCargos] = useState([]);

  return (
    <div>
      <div>
        <span>Ganancias</span>
        <div>
          <span>{/* Aquí deberías incluir el valor de las ganancias */}</span>
        </div>
        <span>Ganancias totales</span>
      </div>

      <div>
        <span>Ventas</span>
        <div>
          <span>{/* Aquí deberías incluir el valor de las ventas */}$</span>
        </div>
        <span>Ventas totales</span>
      </div>

      <div>
        <span>Costos</span>
        <div>
          <span>{/* Aquí deberías incluir el valor de los costos */}$</span>
          {/* Condición opcional */}
          {/* {totalCostos < totalAmount && <span>Costos son menores que las ganancias</span>} */}
        </div>
        <span>Costos totales</span>
      </div>
    </div>
  );
}

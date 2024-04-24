import React, { useState, useEffect } from "react";

export default function FeaturedInfo() {
  const [cargos, setCargos] = useState([]);

  return (
    <div className="featuredInfo">
      <div className="infoBlock">
        <span>Ganancias</span>
        <div>
          <span>$500</span> {/* Ejemplo de valor de ganancias */}
        </div>
        <span>Ganancias totales</span>
      </div>

      <div className="infoBlock">
        <span>Ventas</span>
        <div>
          <span>$1000</span> {/* Ejemplo de valor de ventas */}
        </div>
        <span>Ventas totales</span>
      </div>

      <div className="infoBlock">
        <span>Costos</span>
        <div>
          <span>$300</span> {/* Ejemplo de valor de costos */}
        </div>
        <span>Costos totales</span>
      </div>
    </div>
  );
}

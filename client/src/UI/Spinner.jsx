import React from "react";

const Spinner = () => {
  return (
    <div className="spinner">
      <div style={{ width: "5rem", height: "5rem" }} role="status">
        <span>Cargando...</span>
      </div>
    </div>
  );
};

export default Spinner;

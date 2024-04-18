import React, { useState, useEffect } from "react";
import { FaUser, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logos/LOGO 1.jpeg";

export default function NavBarAdmin() {
  return (
    <nav className="navbarAdmin">
      <div className="sidebarAdmin__header">
        <img src={logo} alt="chef" className="sidebarAdmin__image" />
      </div>

      <div className="navbarAdmin__left">
        <h1 className="navbarAdmin__title">Panel de Administrador</h1>
      </div>
      <div className="navbarAdmin__right">
        <div className="navbarAdmin__menu"></div>
        <div className="navbarAdmin__icons">
          <button className="navbarAdmin__icon-button">
            <FaUser className="navbarAdmin__icon" />
          </button>
          <button
            className="navbarAdmin__icon-button"
            // onClick={() => {
            //   alert(`Tiene ${mensajeNoLeido} mensajes sin leer.`);
            // }}
          >
            <FaBell className="navbarAdmin__icon" />
            {/* {mensajeNoLeido > 0 && (
              <span className="navbarAdmin__badge">{mensajeNoLeido}</span>
            )} */}
          </button>
        </div>
      </div>
    </nav>
  );
}

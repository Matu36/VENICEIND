import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import {
  MdShoppingBasket,
  MdPerson,
  MdAttachMoney,
  MdMail,
  MdOutlineEditCalendar,
} from "react-icons/md";

const SideBarAdmin = () => {
  const categories = [
    { label: "Home", icon: FaHome },
    { label: "Productos", icon: MdShoppingBasket },
    { label: "Usuarios", icon: MdPerson },
    { label: "Ventas", icon: MdAttachMoney },
    { label: "Calendario", icon: MdOutlineEditCalendar },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="sidebarAdmin">
      <div className="sidebarAdmin__content">
        {categories.map((category) => (
          <Link
            key={category.label}
            to={`/admin/${category.label.toLowerCase()}`}
            className={`sidebarAdmin__button ${
              activeCategory.label === category.label ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            <category.icon className="icon" />
            {category.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBarAdmin;

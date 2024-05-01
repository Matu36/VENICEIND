const { Ventas } = require("../db.js");

const getAllVentas = async (req, res) => {
  try {
    const allVentas = await Ventas.findAll();

    return res.status(200).json({ allVentas });
  } catch (error) {
    console.error("Error al obtener todas las ventas:", error);

    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  getAllVentas,
};

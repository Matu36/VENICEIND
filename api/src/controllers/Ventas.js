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

const createVenta = async (req, res) => {
  try {
    if (
      !req.body?.marca ||
      !req.body?.codigo ||
      !req.body?.precio ||
      !req.body?.fecha
    )
      throw "No body params";

    const generateNewId = async () => {
      const maxId = await Ventas.max("id");
      const newId = maxId ? maxId + 1 : 1;
      return newId;
    };

    let id = await generateNewId();

    let createdVenta = await Ventas.create({ id, ...req.body });

    return res.status(201).send(createdVenta);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};

module.exports = {
  getAllVentas,
  createVenta,
};

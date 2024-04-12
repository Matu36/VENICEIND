const { Productos } = require("../db.js");

const getProductos = async (req, res) => {
  try {
    let com = await Productos.findAll();

    return !com
      ? res.status(404).send("No hay Productos")
      : res.send(
          com.map(
            ({
              id,
              nombre,
              marca,
              imagen,
              imagen1,
              imagen2,
              imagen3,
              precio,
              codigo,
              talle,
              cantidadTotal,
            }) => ({
              id,
              nombre,
              marca,
              imagen,
              imagen1,
              imagen2,
              imagen3,
              precio,
              codigo,
              talle,
              cantidadTotal,
            })
          )
        );
  } catch (error) {
    console.log(error);
    return res.status(404).send("Error 404");
  }
};

const putProductos = async (req, res) => {
  try {
    const { id, ...updatedFields } = req.body;

    // Validar que el ID sea un valor válido
    if (!id) {
      return res
        .status(400)
        .send("Se requiere un ID válido para actualizar el producto.");
    }

    // Buscar el producto por ID
    let producto = await Productos.findOne({ where: { id } });

    // Verificar si se encontró el producto
    if (!producto) {
      return res.status(404).send("No se encontró el producto.");
    }

    // Actualizar el producto con los campos actualizados
    await producto.update(updatedFields);

    // Recargar el producto actualizado
    await producto.reload();

    // Enviar el producto actualizado como respuesta
    return res.send(producto);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error interno del servidor.");
  }
};

const createProducto = async (req, res) => {
  try {
    if (
      !req.body?.marca ||
      !req.body?.precio ||
      !req.body?.imagen ||
      !req.body?.imagen1 ||
      !req.body?.codigo ||
      !req.body?.talle ||
      !req.body?.cantidadTotal
    )
      throw "No body params";

    const generateNewId = async () => {
      const maxId = await Productos.max("id");
      const newId = maxId ? maxId + 1 : 1;
      return newId;
    };

    let id = await generateNewId();

    let createdProducto = await Productos.create({ id, ...req.body });

    return res.status(201).send(createdProducto);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};

const deleteProducto = async (req, res) => {
  try {
    const { id } = req.body;
    await Productos.destroy({
      where: {
        id,
      },
    });

    res.status(200).send("Producto eliminado exitosamente");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  getProductos,
  putProductos,
  createProducto,
  deleteProducto,
};

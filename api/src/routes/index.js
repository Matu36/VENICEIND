const { Router } = require("express");
// const {getComidas, putComidas, createComida, deleteComida} = require ("../controllers/ComidasCont");
const {
  login,
  registro,
  putUser,
  resetPassword,
} = require("../controllers/Usuarios");

const {
  getProductos,
  putProductos,
  createProducto,
  deleteProducto,
} = require("../controllers/Productos");

const {
  Payment,
  postVentaMercadoPago,
  getMercadoPago,
} = require("../controllers/MercadoPago");

const check = require("../middlewares/auth");

//VAMOS A USAR ESTO CUANDO NECESITEMOS TENER LOS DATOS DE DE SESION DEL USUARIO O CUANDO NECESITEMOS SEGURIDAD.

//PARA APLICAR EL MIDDLEWARE EN ALGUNA RUTA QUEDARIA ALGO ASI:

// router.get("/usuarios", check.auth, getUsers);
//En el postman se prueba poniendo dentro de la accion GET, en los headers, y en Authorization el TOKEN GENERADO

const router = Router();

router.post("/usuarios/login", login);
router.post("/usuarios/registro", registro);
router.put("/usuarios", check.auth, putUser);
router.put("/usuarios/recoverpass", resetPassword);
router.get("/productos", getProductos);
router.post("/productos/create", check.auth, createProducto);
router.put("/productos/edit", check.auth, putProductos);
router.delete("/productos/delete", check.auth, deleteProducto);
router.post("/payment", Payment);
router.post("/paymentDBLOCAL", postVentaMercadoPago);
router.get("/paymentDBLOCAL", getMercadoPago);

module.exports = router;

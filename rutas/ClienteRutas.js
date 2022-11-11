const clienteOperaciones = require("../operaciones/ClienteOperaciones");
const router = require("express").Router();

router.get("/", clienteOperaciones.buscarClientes);
router.get("/:id", clienteOperaciones.buscarClientePorId);
router.put("/:id", clienteOperaciones.modificarCliente);
router.post("/", clienteOperaciones.crearCliente);
//router.delete("/:id", clienteOperaciones.borrarCliente);

module.exports = router;
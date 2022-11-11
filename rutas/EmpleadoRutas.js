const empleadoOperaciones = require("../operaciones/EmpleadoOperaciones");
const router = require("express").Router();

router.get("/", empleadoOperaciones.buscarEmpleados);
router.get("/:id", empleadoOperaciones.buscarEmpleadoPorId);
router.put("/:id", empleadoOperaciones.modificarempleado);
router.post("/", empleadoOperaciones.crearEmpleado);
//router.delete("/:id", empleadoOperaciones.borrarempleado);

module.exports = router;
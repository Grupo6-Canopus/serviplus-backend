const LoginEmpleadosOperaciones = require ("../operaciones/LoginEmpleadosOperaciones");
const router = require('express').Router();

router.post("/", LoginEmpleadosOperaciones.login);

module.exports = router
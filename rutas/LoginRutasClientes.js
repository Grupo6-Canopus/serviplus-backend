const LoginClientesOperaciones = require ("../operaciones/LoginClientesOperaciones");
const router = require('express').Router();

router.post("/", LoginClientesOperaciones.login);

module.exports = router
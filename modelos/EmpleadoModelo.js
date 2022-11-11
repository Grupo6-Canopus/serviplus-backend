const mongoose = require("mongoose");

const empleadoSchema = mongoose.Schema({
    codigo: { type: String, maxLength: 20, required: true, unique: true },
    nombres: { type: String, maxLength: 50, required: true, unique: false },
    apellidos: { type: String, maxLength: 50, required: true, unique: false },
    cargo: { type: String, maxLength: 30, required: true, unique: false },
    area: { type: String, maxLength: 30, required: true, unique: false },
    telefono: { type: String, required: true, unique: false },
    email: { type: String, maxLength: 80, required: true, unique: true },
    rolAdministrador: { type: Boolean, required: true, unique: false },
    activo: { type: Boolean, required: true},
    password: { type: String, required: true, unique: false }
});

module.exports = mongoose.model("empleados", empleadoSchema);
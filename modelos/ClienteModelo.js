const mongoose = require("mongoose");

const clienteSchema = mongoose.Schema({
    tipo_identificacion: { type: String, maxLength: 30, required: true, unique: false },
    identificacion: { type: String, maxLength: 20, required: true, unique: true },
    nombres: { type: String, maxLength: 50, required: true, unique: false },
    apellidos: { type: String, maxLength: 50, required: true, unique: false },
    sede: { type: String, maxLength: 20, required: true, unique: false },
    telefono: { type: String, required: true, unique: false },
    email: { type: String, maxLength: 80, required: true, unique: true },
    password: { type: String, required: true, unique: false }
});

module.exports = mongoose.model("clientes", clienteSchema);
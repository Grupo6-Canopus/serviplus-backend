const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    radicado: { type: String, maxLength: 20, required: false, unique: false },
    id_cliente: { type: String, maxLength: 20, required: true, unique: true },
    email_cliente: { type: String, maxLength: 80, required: true, unique: true },
    cod_empleado: { type: String, maxLength: 20, required: false, unique: true },
    tipo_requerimiento: { type: String, maxLength: 20, required: true, unique: false },
    descripcion: { type: String, maxLength: 200, required: true, unique: false },
    prioridad: { type: String, required: false, unique: true },
    fecha_radicacion: { type: Date, required: true, unique: false },
    estado: { type: String, required: false, unique: false }
});

module.exports = mongoose.model("tickets", ticketSchema);
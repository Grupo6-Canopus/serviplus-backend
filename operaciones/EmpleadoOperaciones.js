const empleadoModelo = require("../modelos/EmpleadoModelo");
const bcrypt = require ("bcrypt");
const empleadoOperaciones = {}

const cifrarPassword = async (passw) => {
    const SALT_TIMES = 10;
    const salt = await bcrypt.genSalt(SALT_TIMES);
    return await bcrypt.hash (passw, salt);
}

empleadoOperaciones.crearEmpleado = async (req, res)=>{
    try {
        const body = req.body;
        body.password = await cifrarPassword(body.password);
        const empleado = new empleadoModelo(body);
        const empleadoGuardado = await empleado.save();
        res.status(201).send(empleadoGuardado);
    } catch (error) {
        res.status(400).send("La petición está errada. "+error);
    }
}

empleadoOperaciones.buscarEmpleados = async (req, res)=>{
    try {
        const filtro = req.query;
        let listaempleados;
        if (filtro.q != null) {
            listaempleados = await empleadoModelo.find({
                "$or" : [ 
                    { "codigo": { $regex:filtro.q, $options:"i" }},
                    { "nombres": { $regex:filtro.q, $options:"i" }},
                    { "apellidos": { $regex:filtro.q, $options:"i" }},
                    { "cargo": { $regex:filtro.q, $options:"i" }},
                    { "area": { $regex:filtro.q, $options:"i" }},
                    { "telefono": { $regex:filtro.q, $options:"i" }},
                    { "email": { $regex:filtro.q, $options:"i" }}
                ]
            });
        }
        else {
            listaempleados = await empleadoModelo.find(filtro);
        }
        if (listaempleados.length > 0){
            res.status(200).send(listaempleados);
        } else {
            res.status(404).send("No se encontró el empleado buscado.");
        }
    } catch (error) {
        res.status(400).send("La petición está errada. "+error);
    }
}

empleadoOperaciones.buscarEmpleadoPorId = async (req, res)=>{
    try {
        const id = req.params.id;
        const empleadoporId = await empleadoModelo.findById(id);
        if (empleadoporId != null ){
            res.status(200).send(empleadoporId);
        } else {
            res.status(404).send("No se encontró el empleado buscado");
        }
    } catch (error) {
        res.status(400).send("La petición está errada "+error);
    }
}

empleadoOperaciones.modificarempleado = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        if (body.passw != null) {
            body.passw = await cifrarPassword (body.passw)
        }
        const datosActualizar = {
            nombres: body.nombres,
            apellidos: body.apellidos,
            cargo: body.cargo,
            area: body.area,
            telefono: body.telefono,
            rolAdministrador:  body.rolAdministrador,
            password: body.password
        }
        const empleadoActualizado = await empleadoModelo.findByIdAndUpdate(id, datosActualizar, { new : true });
        if (empleadoActualizado != null) {
            res.status(200).send(empleadoActualizado);
        }
        else {
            res.status(404).send("No fue posible actualizar el empleado.");
        }
    } catch (error) {
        res.status(400).send("La petición está errada. "+error);
    }
}

/*empleadoOperaciones.borrarempleado = async (req, res)=>{
    try {
        const id = req.params.id;
        const empleado = await empleadoModelo.findByIdAndDelete(id);
        if (empleado != null){
            res.status(200).send(empleado);
        } else {
            res.status(404).send("No fue posible borrar el empleado");
        }
    } catch (error) {
        res.status(400).send("La petición está errada. "+error);
    }
}*/

module.exports = empleadoOperaciones;

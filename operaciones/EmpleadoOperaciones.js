const empleadoModelo = require("../modelos/EmpleadoModelo");
const empleadoOperaciones = {}

empleadoOperaciones.crearEmpleado = async (req, res)=>{
    try {
        const objeto = req.body;
        console.log(objeto);
        const empleado = new empleadoModelo(objeto);
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
        res.status(400).json("La petición está errada");
    }
}

empleadoOperaciones.modificarempleado = async (req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        const datosActualizar = {
            nombres: body.nombres,
            apellidos: body.apellidos,
            cargo: body.cargo,
            area: body.area,
            telefono: body.telefono
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

empleadoOperaciones.borrarempleado = async (req, res)=>{
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
}

module.exports = empleadoOperaciones;

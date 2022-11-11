const clienteModelo = require("../modelos/ClienteModelo");
const bcrypt = require ("bcrypt");
const clienteOperaciones = {};

const cifrarPassword = async (passw) => {
    const SALT_TIMES = 10;
    const salt = await bcrypt.genSalt(SALT_TIMES);
    return await bcrypt.hash(passw, salt);
}

clienteOperaciones.crearCliente = async (req, res)=>{
    try {
        const body = req.body;
        body.password = await cifrarPassword(body.password);
        const cliente = new clienteModelo(body);
        const clienteGuardado = await cliente.save();
        res.status(201).send(clienteGuardado);
    } catch (error) {
        res.status(400).send("La petición está errada. "+error);
    }
}

clienteOperaciones.buscarClientes = async (req, res)=>{
    try {
        const filtro = req.query;
        let listaclientes;
        if (filtro.q != null) {
            listaclientes = await clienteModelo.find({
                "$or" : [ 
                    { "identificacion": { $regex:filtro.q, $options:"i" }},
                    { "nombres": { $regex:filtro.q, $options:"i" }},
                    { "apellidos": { $regex:filtro.q, $options:"i" }},
                    { "telefono": { $regex:filtro.q, $options:"i" }},
                    { "email": { $regex:filtro.q, $options:"i" }}
                ]
            });
        }
        else {
            listaclientes = await clienteModelo.find(filtro);
        }
        res.status(200).send(listaclientes);
    } catch (error) {
        res.status(400).send("La petición está errada. "+error);
    }
}

clienteOperaciones.buscarClientePorId = async (req, res)=>{
    try {
        const id = req.params.id;
        const clienteporId = await clienteModelo.findById(id);
        if (clienteporId != null ){
            res.status(200).send(clienteporId);
        } else {
            res.status(404).send("No se encontró el cliente buscado");
        }
    } catch (error) {
        res.status(400).send("La petición está errada "+error);
    }
}

clienteOperaciones.modificarCliente = async (req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        if (body.passw != null) {
            body.passw = await cifrarPassword (body.passw)
        }
        const datosActualizar = {
            nombres: body.nombres,
            apellidos: body.apellidos,
            sede: body.sede,
            email: body.email,
            telefono: body.telefono,
            password: body.password
        }
        const clienteActualizado = await clienteModelo.findByIdAndUpdate(id, datosActualizar, { new : true });
        if (clienteActualizado != null) {
            res.status(200).send(clienteActualizado);
        }
        else {
            res.status(404).send("No fue posible actualizar el cliente.");
        }
    } catch (error) {
        res.status(400).send("La petición está errada. "+error);
    }
}

/*clienteOperaciones.borrarCliente = async (req, res)=>{
    try {
        const id = req.params.id;
        const cliente = await clienteModelo.findByIdAndDelete(id);
        if (cliente != null){
            res.status(200).send(cliente);
        } else {
            res.status(404).send("No fue posible borrar el cliente");
        }
    } catch (error) {
        res.status(400).send("La petición está errada. "+error);
    }
}*/

module.exports = clienteOperaciones;

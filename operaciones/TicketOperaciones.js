const ticketModelo = require("../modelos/TicketModelo");
const ticketOperaciones = {}

ticketOperaciones.crearTicket = async (req, res)=>{
    try {
        const objeto = req.body;
        console.log(objeto);
        const ticket = new ticketModelo(objeto);
        const ticketGuardado = await ticket.save();
        res.status(201).send(ticketGuardado);
    } catch (error) {
        res.status(400).send("La petición está errada. "+error);
    }
}

ticketOperaciones.buscarTickets = async (req, res)=>{
    try {
        const filtro = req.query;
        let listatickets;
        if (filtro.q != null) {
            listatickets = await ticketModelo.find({
                "$or" : [ 
                    { "tipo_requerimiento": { $regex:filtro.q, $options:"i" }},
                    { "prioridad": { $regex:filtro.q, $options:"i" }},
                    { "fecha_radicacio": { $regex:filtro.q, $options:"i" }}
                ]
            });
        }
        else {
            listatickets = await ticketModelo.find(filtro);
        }
        if (listatickets.length > 0){
            res.status(200).send(listatickets);
        } else {
            res.status(404).send("No se encontró el ticket buscado.");
        }
    } catch (error) {
        res.status(400).send("La petición está errada. "+error);
    }
}

ticketOperaciones.buscarTicketPorId = async (req, res)=>{
    try {
        const id = req.params.id;
        const ticketporId = await ticketModelo.findById(id);
        if (ticketporId != null ){
            res.status(200).send(ticketporId);
        } else {
            res.status(404).send("No se encontró el ticket buscado");
        }
    } catch (error) {
        res.status(400).json("La petición está errada");
    }
}

/*empleadoOperaciones.modificarempleado = async (req, res)=>{
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
}*/

module.exports = ticketOperaciones;

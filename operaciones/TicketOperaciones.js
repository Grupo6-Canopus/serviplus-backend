const ticketModelo = require("../modelos/TicketModelo");
const ticketOperaciones = {}

ticketOperaciones.crearTicket = async (req, res)=>{
    try {
        const body = req.body;
        console.log(body);
        const ticket = new ticketModelo(body);
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
                    { "radicado": { $regex:filtro.q, $options:"i" }},
                    { "id_cliente": { $regex:filtro.q, $options:"i" }},
                    { "email_cliente": { $regex:filtro.q, $options:"i" }},
                    { "cod_empleado": { $regex:filtro.q, $options:"i" }},
                    { "tipo_requerimiento": { $regex:filtro.q, $options:"i" }},
                    { "descripcion": { $regex:filtro.q, $options:"i" }},
                    { "prioridad": { $regex:filtro.q, $options:"i" }}
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

module.exports = ticketOperaciones;

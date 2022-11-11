const ticketOperaciones = require("../operaciones/TicketOperaciones");
const router = require("express").Router();

router.get("/", ticketOperaciones.buscarTickets);
router.get("/:id", ticketOperaciones.buscarTicketPorId);
router.post("/", ticketOperaciones.crearTicket);

module.exports = router;
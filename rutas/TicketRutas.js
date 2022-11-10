const ticketOperaciones = require("../operaciones/TicketOperaciones");
const router = require("express").Router();

router.get("/", ticketOperaciones.buscarTickets);
router.get("/:id", ticketOperaciones.buscarTicketPorId);
router.put("/:id", ticketOperaciones.modificarticket);


module.exports = router;
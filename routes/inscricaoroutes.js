var express = require("express");
var router = express.Router();
var ReservaModels = require('../models/ReservaModelsModels');


router.post('/:id/reservas', async function(req, res, next) {
    let eventoId = req.body.eventoId;
    let pessoaId = req.body.pessoaId

    console.log("Reserva feita with id "+pessoaId);
    let result = await ReservaModels.reservaPessoa(eventoId, pessoaId);
    res.status(result.status).send(result.result.rows);
});

module.exports = router;
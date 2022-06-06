var express = require("express");
var router = express.Router();
var ReservaModels = require('../models/ReservaModels');




router.get("/", async function (req, res, next) {
    let result = await ReservaModels.getAllinscricao();
    res.status(result.status).send(result.result.rows);
});

router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[inscricaoroutes] user with id: "+ id);
    let result = await ReservaModels.getUser(id);
    res.status(result.status).send(result.data);

});

router.post('/reservar', async function(req, res, next) {
    let eventoId = req.body.eventoId;
    let pessoaId = req.body.pessoaId;
    console.log("Reserva feita with id "+pessoaId);
    let result = await ReservaModels.reservaPessoa(eventoId, pessoaId);
    res.status(result.status).send(result.result.rows);
});
module.exports = router;
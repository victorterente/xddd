var express = require("express");
var router = express.Router();
var ReservaModels = require('../models/ReservaModels');




router.get("/", async function (req, res, next) {
    let result = await ReservaModels.getAllinscricao();
    res.status(result.status).send(result.result.rows);
});

router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[pessoaroutes] user with id:" + id );
    let result = await ReservaModels.getAllinscricaobyidpessoa(id);
    res.status(result.status).send(result.data);

});

router.post('/:id(\\d+)/reservas', async function(req, res, next) {
    let campoId = req.body.eventoId;
    let PessoaId = req.body.pessoaId;
    console.log("Reserva feita with id "+PessoaId);
    let result = await ReservaModels.reservaPessoa(campoId, PessoaId);
    res.status(result.status).send(result.result.rows);
});
module.exports = router;
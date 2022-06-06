var express = require('express');
var router = express.Router();
var EventoModels = require('../models/EventoModels');



router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[eventoroutes] user with id:" + id);
    let result = await EventoModels.getEvento(id);
    res.status(result.status).send(result.data);

});

router.get("/", async function (req, res, next) {
    let result = await EventoModels.getAllEventos();
    res.status(result.status).send(result.result.rows);
});
router.post('/new',async function(req, res, next) {
    let body = req.body
    let result = await EventoModels.registerEvento(body);
    res.status(result.status).send(result.data);
});

router.delete('/delete/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[eventoroutes] Deleting evento with id: "+ id);
    let result = await EventoModels.deleteEvento(id);
    res.status(result.status).send(result.data);

});

module.exports = router;
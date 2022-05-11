var express = require('express');
var router = express.Router();
var EventoModels = require('../models/EventoModels');




router.get("/", async function (req, res, next) {
    let result = await EventoModels.getAllEventos();
    res.status(result.status).send(result.result.rows);
});
router.post('/new',async function(req, res, next) {
    let body = req.body
    let result = await EventoModels.registerEvento(body);
    res.status(result.status).send(result.data);
});

module.exports = router;
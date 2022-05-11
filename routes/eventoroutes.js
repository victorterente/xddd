var express = require('express');
var router = express.Router();
var EventoModels = require('../models/EventoModels');



router.get("/", async function (req, res, next) {
    let result = await EventoModels.getAllEventos();
    res.status(result.status).send(result.result.rows);
});


module.exports = router;
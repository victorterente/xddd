var express = require('express');
var router = express.Router();
var tipolocais = require('../models/tipolocaismodels');


router.get("/", async function (req, res, next) {
    let result = await tipolocais.getAllTipolocais();
    res.status(result.status).send(result.result.rows);
});
module.exports = router;
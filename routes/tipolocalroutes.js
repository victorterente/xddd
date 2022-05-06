var express = require('express');
var router = express.Router();
var TipoLocalModels = require('../models/TipoLocalModels');
const PessoaModels = require("../models/PessoaModels");



router.get("/", async function (req, res, next) {
    let result = await TipoLocalModels.getAllTipolocais();
    res.status(result.status).send(result.result.rows);
});

router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[tipolocalroutes] user with id:" + id);
    let result = await TipoLocalModels.getTipoLocais(id);
    res.status(result.status).send(result.data);

});
module.exports = router;
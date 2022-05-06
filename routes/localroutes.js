var express = require('express');
var router = express.Router();
var LocalModels = require('../models/LocalModels');
const PessoaModels = require("../models/PessoaModels");


router.get("/", async function (req, res, next) {
    let result = await PessoaModels.getAllPessoas();
    res.status(result.status).send(result.result.rows);
});
module.exports = router;

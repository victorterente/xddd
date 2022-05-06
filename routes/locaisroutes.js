var express = require('express');
var router = express.Router();
var locais = require('../models/locaisModels');


router.get("/", async function (req, res, next) {
    let result = await locais.getAlllocais();
    res.status(result.status).send(result.result.rows);
});
module.exports = router;
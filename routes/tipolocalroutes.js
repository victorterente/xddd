var express = require('express');
var router = express.Router();
var TipoLocalModels = require('../models/TipoLocalModels');



router.get("/", async function (req, res, next) {
    let result = await TipoLocalModels.getAllTipolocais();
    res.status(result.status).send(result.result.rows);
});
module.exports = router;
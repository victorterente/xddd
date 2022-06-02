var express = require("express");
var router = express.Router();
var ReservaModels = require('../models/ReservaModelsModels');



router.get("/", async function (req, res, next) {
    let result = await ReservaModels.getAllinscricao();
    res.status(result.status).send(result.result.rows);
});

module.exports = router;
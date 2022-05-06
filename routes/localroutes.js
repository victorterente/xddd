var express = require('express');
var router = express.Router();
var LocalModels = require('../models/LocalModels');



router.get("/", async function (req, res, next) {
    let result = await LocalModels.getAlllocais();
    res.status(result.status).send(result.result.rows);
});
module.exports = router;

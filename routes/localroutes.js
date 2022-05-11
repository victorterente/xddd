var express = require('express');
var router = express.Router();
var LocalModels = require('../models/LocalModels');




router.get("/", async function (req, res, next) {
    let result = await LocalModels.getAlllocais();
    res.status(result.status).send(result.result.rows);
});

router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[localroutes] user with id:" + id);
    let result = await LocalModels.getLocais(id);
    res.status(result.status).send(result.data);

});

module.exports = router;


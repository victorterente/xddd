var express = require('express');
var router = express.Router();
var TlModels = require('../models/TlModels');



router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[tlroutes] user with id:" + id);
    let result = await TlModels.getTl(id);
    res.status(result.status).send(result.data);

});
module.exports = router;

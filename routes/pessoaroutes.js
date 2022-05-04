var express = require('express');
var router = express.Router();
var PessoaModels = require('../models/PessoaModels');



/* GET products listing. */
router.get('/:id(\\d+)', async function(req, res, next) {
    console.log("[pessoaroutes] user with id:" + id);
    let result = await PessoaModels.getPessoas(id);
    res.status(result.status).send(result.data);

});
module.exports = router;
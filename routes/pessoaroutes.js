var express = require('express');
var router = express.Router();
var PessoaModels = require('../models/PessoaModels');



/* GET products listing. */
router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[pessoaroutes] user with id:" + id);
    let result = await PessoaModels.getPessoas(id);
    res.status(result.status).send(result.data);

});
router.post('/register',async function(req, res, next) {
   let body = req.body
    let result = await PessoaModels.registerPessoa(body);
});
module.exports = router;

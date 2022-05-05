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
    let nome = req.body.nome;
    let morada = req.body.morada;
    let dtnasc = req.body.dtnasc;
    let genero = req.body.genero;
    let email = req.body.email;
    let pass = req.body.pass;
    let tlm = req.body.tlm;
    let result = await PessoaModels.registerPessoa(nome,morada,dtnasc,genero,email,pass,tlm);
    res.status(result.status).send(result.result);
});
module.exports = router;

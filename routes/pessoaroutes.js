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

router.post('/login',async function(req, res, next) {
    let email = req.body.email;
    let password = req.body.pass;
    let result = await mProd.loginPessoa(email,password);
    res.status(result.status).send(result.result);
});

router.get("/", async function (req, res, next) {
    let result = await PessoaModels.getAllPessoas();
    res.status(result.status).send(result.result.rows);
});

router.post('/register',async function(req, res, next) {
   let body = req.body
    let result = await PessoaModels.registerPessoa(body);
    res.status(result.status).send(result.data);
});
module.exports = router;

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
router.delete('/delete/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[pessoaroutes] Deleting boat with id: "+ id);
    let result = await PessoaModels.deleteUser(id);
    res.status(result.status).send(result.data);

});

router.put('/update', async function(req, res, next) {
    let user = req.body;
    console.log("[pessoaroutes] Updating user" + JSON.stringify(user));
    let result = await PessoaModels.updateUser(user);
    res.status(result.status).send(result.data);

});

router.get('/login/:email/:password', async function(req, res, next) {
    let email = req.params.email
    let password = req.params.password
    console.log("[pessoaroutes] Login: Email: "+ JSON.stringify(email) + "Password: " + JSON.stringify(password));
    let result = await PessoaModels.getUserLogin(email, password);
    res.status(result.status).send(result.data);

});

router.post('/login', async function(req, res, next) {
    let user = req.body;
    console.log("[pessoaroutes] Login: " + JSON.stringify(user));
    let result = await PessoaModels.getLogin(user);
    res.status(result.status).send(result.data);

});
// router.post('/login',async function(req, res, next) {
//   let email = req.body.email;
//   let password = req.body.pass;
//   let result = await PessoaModels.loginPessoa(email,password);
//   res.status(result.status).send(result.result);
//});

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

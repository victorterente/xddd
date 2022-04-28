var express = require('express');
var router = express.Router();
var PessoaModels = require('../models/PessoaModels');



/* GET products listing. */
router.get('/', async function(req, res, next) {
    console.log("[productsRoutes] Retrieving all products");
    let result = await PessoaModels.getPessoas();
    res.status(result.status).send(result.data);

});
module.exports = router;
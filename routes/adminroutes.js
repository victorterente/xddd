var express = require("express");
var router = express.Router();
var AdminModels = require('../models/AdminModels');

router.get("/", async function (req, res, next) {
    let result = await AdminModels.getAllAdmin();
    res.status(result.status).send(result.result.rows);
});
module.exports = router;
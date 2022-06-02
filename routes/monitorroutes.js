var express = require("express");
var router = express.Router();
var MonitorModels = require('../models/MonitorModels');

router.get("/", async function (req, res, next) {
    let result = await MonitorModels.getAllMonitor();
    res.status(result.status).send(result.result.rows);
});
module.exports = router;
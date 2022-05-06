const client = require("./connection");
const express = require('express');
const {log} = require("debug");
const app = express();


module.exports.getAllTipolocais = async function () {
    try {
        let sql = "Select * from tipo_local";
        let result = await client.query(sql);
        let tipo_local = result;
        return { status: 200, result: tipo_local };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};
const client = require("./connection");
const express = require('express');
const {log} = require("debug");
const app = express();

module.exports.getAllEventos = async function () {
    try {
        let sql = "select *,st_x(evento_geo) lat,st_y(evento_geo) long from evento;";
        let result = await client.query(sql);
        let local = result;
        return { status: 200, result: local };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};

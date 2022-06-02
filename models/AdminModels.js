const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


module.exports.getAllAdmin = async function () {
    try {
        let sql = "select * from pessoa inner join admin on pessoa_id = admin_pessoa_id;icao";
        let result = await client.query(sql);
        let admin = result;
        return { status: 200, result: admin };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};
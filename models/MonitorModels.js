const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


module.exports.getAllMonitor = async function () {
    try {
        let sql = "select * from pessoa inner join monitor on pessoa_id = monitor_pessoa_id";
        let result = await client.query(sql);
        let monitor = result;
        return { status: 200, result: monitor };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};
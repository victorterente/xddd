const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


module.exports.getAlllocais = async function () {
    try {
        let sql = "select * from local";
        let result = await client.query(sql);
        let local = result;
        return { status: 200, result: local };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};
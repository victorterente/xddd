const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();

module.exports.getAllinscricao = async function () {
    try {
        let sql = "Select * from inscricao";
        let result = await client.query(sql);
        let inscricao = result;
        return { status: 200, result: inscricao };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};



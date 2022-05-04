const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();

module.exports.getPessoas = async function() {
    console.log("[PessoaModels.getPessoas] id = ")
    try {
        let sql = "select * from pessoa";
        let result = await client.query(sql);
        let pessoa = result.rows;
        if (pessoa.lenght > 0){
            console.log("[PessoaModels.getPessoas] pessoa = " );
            return { status: 200, data: pessoa[0] };
        } else {
            return { status: 200, data: {msg:"user not found." }};
        }
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}
const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();

module.exports.getPessoas = async function(id) {
    console.log("[PessoaModels.getPessoas] id = " + JSON.stringify(id))
    try {
        let sql = 'select * from pessoa where pessoa_id = $1';
        let result = await client.query(sql, [id]);
        let pessoa = result;
        // if (pessoa.lenght > 0){
        //     console.log("[PessoaModels.getPessoas] pessoa = " + JSON.stringify(pessoa[0]) );
        //     return { status: 200, data: pessoa[0] };
        // } else {
        //     return { status: 200, data: {msg:"user not found." }};
        // }
        return { status: 200, data: pessoa };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}
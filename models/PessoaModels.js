const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();

module.exports.getPessoas = async function(id) {
    console.log("[PessoaModels.getPessoas] id = " + JSON.stringify(id))
    try {
        let sql = 'select * from pessoa where pessoa_id = $1';
        let result = await client.query(sql, [id]);
        let pessoa = result.rows;
        // if (pessoa.lenght > 0){
        //     console.log("[PessoaModels.getPessoas] pessoa = " + JSON.stringify(pessoa[0]) );
        //     return { status: 200, data: pessoa[0] };
        // } else {
        //     return { status: 200, data: {msg:"user not found." }};
        // }
        return {status: 200, data: pessoa};
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    }

    module.exports.addUser = async function (pessoa) {
        if (typeof pessoa != "object") {
            if (pessoa.errMsg)
                return {status: 400, data: {msg: pessoa.errMsg}};
            else
                return {status: 400, data: {msg: "Malformed data"}};
        }
        try {
            let sql = 'insert into pessoa(pessoa_nome, pessoa_morada, pessoa_dtnasc, pessoa_genero, pessoa_email, pessoa_pass, pessoa_tlm)'
            values ('${pessoa.nome}', '${pessoa.dtnasc}','${pessoa.morada}', '${pessoa.genero}', '${pessoa.email}', '${pessoa.pass}','${pessoa.tlm}')
            let result = await client.query(sql);
            let pessoa = result.rows[0];
            console.log("[PessoaModels.addUser] user = " + JSON.stringify(pessoa));
            return {status: 200, data: "Successfully added a user"};
        } catch (err) {
            console.log(err);
            return {status: 500, data: err};
        }

    }
}
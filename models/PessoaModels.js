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



}
module.exports.getAllPessoas = async function () {
    try {
        let sql = "Select * from pessoa";
        let result = await client.query(sql);
        let pessoa = result;
        return { status: 200, result: pessoa };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};


module.exports.registerPessoa = async function (newpessoa) {
    try {
        let nome = newpessoa.nome;
        let morada = newpessoa.morada;
        let dtnasc = newpessoa.dtnasc;
        let genero = newpessoa.genero;
        let email = newpessoa.email;
        let pass = newpessoa.pass;
        let tlm = newpessoa.tlm;
        //var sql = "SELECT * FROM pessoa WHERE pessoa_email =?";
        //  let result = await pool.query(sql, [email]);
        //   if (result.length > 0)
        //      return { status: 401, result: { msg: "Já está registado" } };
        //  else {
        var sql = 'INSERT INTO pessoa (pessoa_nome, pessoa_morada, pessoa_dtnasc, pessoa_genero, pessoa_email,pessoa_pass,pessoa_tlm) VALUES ($1,$2,$3,$4,$5,$6,$7)';
        let result = await client.query(sql,[ nome, morada, dtnasc, genero, email, pass, tlm ])
        let pessoa = result.rows;
        return { status: 200, result: { msg: "registado com sucesso" }, data : pessoa };;
        //   }
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};
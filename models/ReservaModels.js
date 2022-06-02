const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();

module.exports.reservaPessoa = async function (eventoId , pessoaId) {
    try {
        let sql = "SELECT * from inscricao WHERE inscricao_evento = $1 and inscricao_pessoa = $2 "
        let result = await client.query(sql, [eventoId , pessoaId]);
        if (result.length>0)
            return { status: 401, result: { msg: "Já está inscrito" } };
        else {
            let sql = "insert into inscricao (inscricao_evento, inscricao_pessoa) VALUES ('$1','$2');";
            let result = await client.query(sql, [eventoId , pessoaId]);
            return { status: 200, result: { msg: "Inscrição efectuada com sucesso" } };
        }
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};

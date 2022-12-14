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

module.exports.deleteInscricao = async function(id) {
    console.log("[PessoaModels.deleteUser] id = " + JSON.stringify(id));
    try {
        let sql = `delete
                   from inscricao
                   where inscricao_id = $1`
        let result = await client.query(sql, [id]);
        return {status: 200, data: "Deletion was successful"}
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    }
}
module.exports.getUser = async function(id) {
    console.log("[ReservaModels.getUser] id = " + JSON.stringify(id));
    try {
        let sql = ` select evento_id, inscricao_id, pessoa_id, pessoa_nome, evento_nome from evento inner join inscricao on evento_id = inscricao_evento inner join pessoa on inscricao_pessoa = pessoa_id where pessoa_id = $1`;
        let result = await client.query(sql, [id]);
        let user = result.rows;
        if (user.length > 0) {
            console.log("[ReservaModels.getUser] user = " + JSON.stringify(user[0]));
            return { status: 200, data: user };
        } else {
            return { status: 404, data: { msg: "User not found." } };
        }

    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.reservaPessoa = async function (eventoId , pessoaId) {
    try {
        let sql = "SELECT * from inscricao WHERE inscricao_evento = $1 and inscricao_pessoa = $2"
        let result = await client.query(sql, [eventoId , pessoaId]);
        if (result.length>0)
            return { status: 401, result: { msg: "J?? est?? inscrito" } };
        else {
            let sql = "INSERT INTO inscricao (inscricao_evento, inscricao_pessoa) values ($1,$2)";
            let result = await client.query(sql, [eventoId , pessoaId]);

            return { status: 200, result: { msg: "Inscri????o efectuada com sucesso" } };
        }
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};


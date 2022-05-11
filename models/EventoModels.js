const client = require("./connection");
const express = require('express');
const {log} = require("debug");
const app = express();

module.exports.getAllEventos = async function () {
    try {
        let sql = "select *,st_x(evento_geo) lat,st_y(evento_geo) long from evento;";
        let result = await client.query(sql);
        let local = result;
        return { status: 200, result: local };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};
module.exports.registerEvento = async function (newevento) {
    try {
        let nome = newevento.nome;
        let morada = newevento.morada;
        let data = newevento.data;
        let cap = newevento.cap;
        let geo = newevento.geo;
        let desc = newpessoa.desc;

        //var sql = "SELECT * FROM pessoa WHERE pessoa_email =?";
        //  let result = await pool.query(sql, [email]);
        //   if (result.length > 0)
        //      return { status: 401, result: { msg: "Já está registado" } };
        //  else {
        var sql = 'INSERT INTO pessoa (evento_nome, evento_morada, evento_data, evento_cap, evento_desc,evento_geo) VALUES ($1,$2,$3,$4,$5,$6,$7)';
        let result = await client.query(sql,[ nome, morada, data , cap, desc, geo ])
        let pessoa = result.rows;
        return { status: 200, result: { msg: "registado com sucesso" }, data : pessoa };;
        //   }
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};
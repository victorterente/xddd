const client = require("./connection");
const express = require('express');
const {log} = require("debug");
const app = express();

module.exports.getAllEventos = async function () {
    try {
        let sql = "select *,st_x(evento_geo) lat1,st_y(evento_geo) long1 from evento;";
        let result = await client.query(sql);
        let local = result;
        return { status: 200, result: local };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};

module.exports.deleteEvento = async function(id) {
    console.log("[EventoModels.deleteEvento] id = " + JSON.stringify(id));
    try {
        let sql = `delete 
                   from evento inner join inscricao on evento_id = inscricao_evento
                   where evento_id = $1`
        let result = await client.query(sql, [id]);
        return {status: 200, data: "Deletion was successful"}
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    }
}
module.exports.registerEvento = async function (newevento) {
    try {
        let nome = newevento.nome;
        let morada = newevento.morada;
        let data = newevento.data;
        let cap = newevento.cap;
        let geo = newevento.geo;
        let desc = newevento.desc;
        let img = newevento.img;

        //var sql = "SELECT * FROM pessoa WHERE pessoa_email =?";
        //  let result = await pool.query(sql, [email]);
        //   if (result.length > 0)
        //      return { status: 401, result: { msg: "Já está registado" } };
        //  else {
        var sql = 'INSERT INTO evento (evento_nome, evento_morada, evento_data, evento_cap, evento_desc, evento_geo, evento_img) VALUES ($1,$2,$3,$4,$5,$6,$7)';
        let result = await client.query(sql,[ nome, morada, data , cap, desc, geo, img ])
        let pessoa = result.rows;
        return { status: 200, result: { msg: "registado com sucesso" }, data : pessoa };;
        //   }
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};
module.exports.getEvento = async function(id) {
    console.log("[EventoModels.getEvento] id = " + JSON.stringify(id))
    try {
        let sql = 'select *,st_x(evento_geo) lat1,st_y(evento_geo) long1 from evento where evento_id = $1';
        let result = await client.query(sql, [id]);
        let evento = result.rows;
        // if (pessoa.lenght > 0){
        //     console.log("[PessoaModels.getPessoas] pessoa = " + JSON.stringify(pessoa[0]) );
        //     return { status: 200, data: pessoa[0] };
        // } else {
        //     return { status: 200, data: {msg:"user not found." }};
        // }
        return {status: 200, data: evento};
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    }



};
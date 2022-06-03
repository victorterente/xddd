const client = require("./connection");
const express = require('express');
const {log} = require("debug");
const app = express();


module.exports.getAlllocais = async function () {
    try {
        let sql = "select *,st_x(local_geo) lat1,st_y(local_geo) long1 from local;";
        let result = await client.query(sql);
        let local = result;
        return { status: 200, result: local };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};
module.exports.registerLocal = async function (newlocal) {
    try {
        let nome = newlocal.nome;
        let morada = newlocal.morada;
        let tlm = newlocal.tlm;
        let geo = newlocal.geo;
        let desc = newlocal.desc;
        let img = newlocal.img;


        var sql = 'INSERT INTO local (local_nome, local_morada, local_tlm, local_desc, local_geo, local_img) VALUES ($1,$2,$3,$4,$5,$6)';
        let result = await client.query(sql,[ nome, morada, tlm, desc, geo, img ])
        let pessoa = result.rows;
        return { status: 200, result: { msg: "registado com sucesso" }, data : pessoa };;
        //   }
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};

module.exports.getLocais = async function(id) {
    console.log("[LocalModels.getLocais] id = " + JSON.stringify(id))
    try {
        let sql = 'select *,st_x(local_geo) lat1,st_y(local_geo) long1 from local where local_id = $1';
        let result = await client.query(sql, [id]);
        let local = result.rows;
        // if (pessoa.lenght > 0){
        //     console.log("[PessoaModels.getPessoas] pessoa = " + JSON.stringify(pessoa[0]) );
        //     return { status: 200, data: pessoa[0] };
        // } else {
        //     return { status: 200, data: {msg:"user not found." }};
        // }
        return {status: 200, data: local};
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    }



}

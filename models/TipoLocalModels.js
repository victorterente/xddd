const client = require("./connection");
const express = require('express');
const {log} = require("debug");
const app = express();


module.exports.getAllTipolocais = async function () {
    try {
        let sql = "Select * from tipo_local";
        let result = await client.query(sql);
        let tipo_local = result;
        return { status: 200, result: tipo_local };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};
module.exports.getTipoLocais = async function(id) {
    console.log("[TipoLocalModels.getTipoLocais] id = " + JSON.stringify(id))
    try {
        let sql = 'select * from tipo_local where tipolocal_id = $1';
        let result = await client.query(sql, [id]);
        let tipolocal = result.rows;
        // if (pessoa.lenght > 0){
        //     console.log("[PessoaModels.getPessoas] pessoa = " + JSON.stringify(pessoa[0]) );
        //     return { status: 200, data: pessoa[0] };
        // } else {
        //     return { status: 200, data: {msg:"user not found." }};
        // }
        return {status: 200, data: tipolocal};
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    }



}
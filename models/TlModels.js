const client = require("./connection");
const express = require('express');
const {log} = require("debug");
const app = express();

module.exports.getTl = async function(id) {
    console.log("[TlModels.getTl] id = " + JSON.stringify(id))
    try {
        let sql = 'select *,st_x(local_geo) lat,st_y(local_geo) long from local inner join tl on local_id = tl_local_id inner join tipo_local on tl_tipo_id = tipolocal_id where tipolocal_id = $1';
        let result = await client.query(sql, [id]);
        let tl = result.rows;
        // if (pessoa.lenght > 0){
        //     console.log("[PessoaModels.getPessoas] pessoa = " + JSON.stringify(pessoa[0]) );
        //     return { status: 200, data: pessoa[0] };
        // } else {
        //     return { status: 200, data: {msg:"user not found." }};
        // }
        return {status: 200, data: tl};
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    }



}
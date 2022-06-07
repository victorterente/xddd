const client = require("./connection");
const express = require('express');
const {log} = require("debug");
const app = express();


module.exports.localtipo = async function (localId , tipolocalId) {
    try {
            let sql = "INSERT INTO tl (tl_local_id,tl_tipo_id) values ($1,$2)";
            let result = await client.query(sql, [localId , tipolocalId]);

            return { status: 200, result: { msg: "Inscrição efectuada com sucesso" } };

    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}
module.exports.getTl = async function(id) {
    console.log("[TlModels.getTl] id = " + JSON.stringify(id))
    try {
        let sql = 'select *,st_x(local_geo) lat1,st_y(local_geo) long1 from local inner join tl on local_id = tl_local_id inner join tipo_local on tl_tipo_id = tipolocal_id where tipolocal_id = $1';
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
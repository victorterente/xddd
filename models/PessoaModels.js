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

module.exports.deleteUser = async function(id) {
    console.log("[PessoaModels.deleteUser] id = " + JSON.stringify(id));
    try {
        let sql = `delete
                   from pessoa
                   where pessoa_id = $1`
        let result = await client.query(sql, [id]);
        return {status: 200, data: "Deletion was successful"}
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    }
}

module.exports.updateUser = async function(user) {
    if (typeof user != "object" ) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    } try {
        let updateQuery = `update pessoa
                       set pessoa_nome = '${user.nome}',
                       pessoa_email= '${user.email}',
                       pessoa_morada= '${user.morada}',
                         pessoa_tlm= '${user.tlm}',
                       pessoa_pass = '${user.pass}'
                       where pessoa_id = $1`
        let result = await client.query(updateQuery, [id]);


        console.log("[PessoaModels.updateUser] user = " + JSON.stringify(user));
        return {status: 200, data: "Updated succesfully"};
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
    module.exports.getUserLogin = async function (email, password) {
        console.log("[PessoaModels.getUser] Login = Email: " + JSON.stringify(email) + " Password: " + +JSON.stringify(password));

        try {
            let sql = `select *
                       from pessoa
                       WHERE pessoa_email = '${email}'
                         AND pessoa_pass = '${password}'`;
            let result = await client.query(sql);
            let pessoa = result.rows;
            if (pessoa.length > 0) {
                console.log("[PessoaModels.getUser] user = " + JSON.stringify(pessoa[0]));
                return {status: 200, data: pessoa[0]};
            } else {
                return {status: 404, data: {msg: "User not found."}};
            }

        } catch (err) {
            console.log(err);
            return {status: 500, data: err};
        }

    }

    module.exports.getLogin = async function (pessoa) {
        console.log("[PessoaModels.getUser] Login = " + JSON.stringify(pessoa));
        if (typeof pessoa != "object") {
            if (pessoa.errMsg)
                return {status: 400, data: {msg: pessoa.errMsg}};
            else
                return {status: 400, data: {msg: "Malformed data"}};
        }
        try {
            let sql = `select *
                       from pessoa
                       WHERE pessoa_email = '${pessoa.email}'
                         AND pessoa_pass = '${pessoa.pass}'`;
            let result = await client.query(sql);
            let pessoaResult = result.rows;
            if (pessoaResult.length > 0) {
                console.log("[userModel.getUser] user = " + JSON.stringify(pessoaResult[0]));
                return {status: 200, data: pessoaResult[0]};
            } else {
                return {status: 404, data: {msg: "User not found."}};
            }

        } catch (err) {
            console.log(err);
            return {status: 500, data: err};
        }

    }

    module.exports.loginPessoa = async function (email, pass) {
        try {
            let sql = "SELECT pessoa.pessoa_id, admin.admin_id from pessoa left JOIN admin ON pessoa.pessoa_id = admin.pessoa_id Where pessoa.pessoa_email = $1 AND pessoa.pessoa_pass = $2 ";
            let result = await pool.query(sql, [email, pass]);
            if (result.length > 0) return {status: 200, result: result[0]};
            else return {status: 401, result: {msg: "Wrong email or password"}};
        } catch (err) {
            console.log(err);
            return {status: 500, result: err};
        }
    };

    module.exports.getAllPessoas = async function () {
        try {
            let sql = "Select * from pessoa";
            let result = await client.query(sql);
            let pessoa = result;
            return {status: 200, result: pessoa};
        } catch (err) {
            console.log(err);
            return {status: 500, result: err};
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
            let result = await client.query(sql, [nome, morada, dtnasc, genero, email, pass, tlm])
            let pessoa = result.rows;
            return {status: 200, result: {msg: "registado com sucesso"}, data: pessoa};
            ;
            //   }
        } catch (err) {
            console.log(err);
            return {status: 500, result: err};
        }
    };

const client = require('./connection.js')
const express = require('express');
const authenticator = require('otplib');
const totp = require('otplib');

const { all } = require("express/lib/application");
const {log} = require("debug");
const app = express();


module.exports.ativar2fa = async function (PessoaId) {
    try {
        let secret = totp.authenticator.generateSecret(20);
        let token = totp.authenticator.generate(secret);


        let sql = "UPDATE pessoa SET  pessoa_secret = $1 , pessoa_token = $2 WHERE pessoa_id = $3";
        let result = await client.query(sql, [secret,token,PessoaId]);
        let pessoa = result.rows;

        return { status: 200, result: { msg: "Secret gerado com sucesso" } };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};
module.exports.refreshToken = async function () {
    try {

        let sql1 = "select * from pessoa";
        var pessoas = JSON.parse(JSON.stringify(await client.query(sql1)))
        // console.log(pessoas.length)

        for(let i=0; i < pessoas.length; i++){
            if(pessoas[i].pessoa_secret == null){
                void(0)
            }
            else{
                let token = totp.totp.generate(pessoas[i].pessoa_secret);
                let sql = "UPDATE pessoa SET pessoa_token = $1 where pessoa_id = $2";
                let result = await client.query(sql, [token, i+1]);


                // console.log(pessoas[i].pessoa_token);
                // console.log(totp.totp.timeRemaining());

            }
        }
        return { status: 200, result: { msg: "Token updated com sucesso" } };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
};

setInterval(this.refreshToken, 15, "Updating...");



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
            //      return { status: 401, result: { msg: "J?? est?? registado" } };
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


var pool = require("./connection");

module.exports.getPessoas = async function() {
    try {
        let sql = "select * from pessoa";
        let result = await pool.query(sql);
        let pessoa = result.rows;
        console.log("[productsModel.getProducts] products = " + JSON.stringify(pessoa));
        return { status: 200, data: pessoa };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
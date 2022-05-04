var pg = require('pg');
const connectionString = "postgres://tpivdyzsachswd:def201cd0e819bcd070ac3369b49e66f83fe1bf0bdd76c842e60c3ff98494de2@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/d8u05lp8au6iuc"
console.log("connectionString = " + connectionString);
const Pool = pg.Pool
const pool = new Pool({
    connectionString,

    max: 10,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
})

module.exports = pool;

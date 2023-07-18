const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "abinash",
    host: "localhost",
    port: 5432,
    database: "Neepco"
});

module.exports = pool;


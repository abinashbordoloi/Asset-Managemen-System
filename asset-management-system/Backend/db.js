const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "abinash",
    host: "192.168.1.8",
    port: 5432,
    database: "Neepco"
});

module.exports = pool;


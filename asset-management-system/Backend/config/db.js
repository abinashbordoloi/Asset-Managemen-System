const { Pool } = require('pg');

// Create a new instance of the Pool for connecting to the PostgreSQL database
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'Neepco',
  password: 'abinash',
  port: 5432, // Replace with the appropriate port number
});

module.exports = pool;

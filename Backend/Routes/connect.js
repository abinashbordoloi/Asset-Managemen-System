const { Pool } = require("pg");

// Create a new instance of the Pool object
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "AMS",
  password: "Hiran@123",
  port: 5432, // or your PostgreSQL port
});

// Execute a database query
pool.query('SELECT * FROM "public"."Category"', (err, result) => {
  if (err) {
    console.error("Error executing query", err);
    return;
  }
  console.log(result.rows); // Access the query result rows

  // Release the database connection
  pool.end();
});

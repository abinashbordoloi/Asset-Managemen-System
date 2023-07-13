const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "AMS",
  password: "Hiran@123",
  port: 5432,
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/public/Asset", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "public"."Asset"');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/public/Asset", async (req, res) => {
  const { name, type } = req.body;

  try {
    await pool.query(
      'INSERT INTO "public"."Asset" (name, type) VALUES ($1, $2)',
      [name, type]
    );
    res.status(201).json({ message: "Asset created successfully" });
  } catch (error) {
    console.error("Error creating asset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/public/Asset/:id", async (req, res) => {
  const id = req.params.id;
  const { name, type } = req.body;

  try {
    await pool.query(
      'UPDATE "public"."Asset" SET name = $1, type = $2 WHERE id = $3',
      [name, type, id]
    );
    res.json({ message: "Asset updated successfully" });
  } catch (error) {
    console.error("Error updating asset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/public/Asset/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await pool.query('DELETE FROM "public"."Asset" WHERE id = $1', [id]);
    res.json({ message: "Asset deleted successfully" });
  } catch (error) {
    console.error("Error deleting asset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/public/SupplyOrder", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "public"."SupplyOrder"');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

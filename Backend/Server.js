const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "NEEPCO",
  password: "Iamsroita18@",
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

// app.delete("/api/public/Asset/:id", async (req, res) => {
//   const id = req.params.id;

//   try {
//     await pool.query('DELETE FROM "public"."Asset" WHERE id = $1', [id]);
//     res.json({ message: "Asset deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting asset:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

//delete a asset
app.delete("api/public/Assetdelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAsset = await pool.query("DELETE FROM Asset WHERE asset_id = $1", [id]);
    console.log(deleteAsset);
    res.status(204).send(); // Use 204 No Content for successful deletion
  } catch (err) {
    console.error("Error deleting asset:", err);
    res.status(500).json({ error: "Failed to delete asset." }); // Use 500 Internal Server Error for failures
  }
});

//to get supply order
app.get("/api/public/SupplyOrder", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "public"."SupplyOrder"');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// to get location
// app.get("/api/public/Location", async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM "public"."Location"');
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching locations:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.post("/api/public/passwords", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT password_hash FROM public.passwords WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ error: "Invalid username or password" });
    } else {
      const storedHashedPassword = result.rows[0].password_hash;
      const isPasswordValid = await bcrypt.compare(
        password,
        storedHashedPassword
      );

      if (isPasswordValid) {
        res.status(200).json({ message: "User authenticated successfully" });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


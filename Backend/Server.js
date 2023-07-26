const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

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
    console.error("Error fetching assets:", error);
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
    console.error("Error fetching supply orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.post("/api/public/passwords", async (req, res) => {
//   const { username, password } = req.body;

//   // try {
//   //   const result = await pool.query(
//   //     "SELECT password_hash FROM public.passwords WHERE username = $1",

//   //     [username]
//   //   );
//   //   console.log("---------", result);
//   //   res.status(200).json({
//   //     message: "User authenticated successfully",
//   //     r: result,
//   //   });
//   // } catch (error) {}

//   // result.rows[0].password
//   try {
//     const result = await pool.query(
//       "SELECT password_hash FROM public.passwords WHERE username = $1",

//       [username]
//     );
//     // let isPasswordValid = false;

//     if (result.rows.length === 0) {
//       res.status(401).json({ error: "Invalid username or password" });
//     } else {
//       const storedHashedPassword = result.rows[0].password;
//       // if (storedHashedPassword === password) {
//       //   isPasswordValid = true;
//       // } else {
//       //   false;
//       // }
//       // console.log("-----", password, password.length);
//       let IPV = await bcrypt.compare(password, storedHashedPassword);

//       if (IPV === true) {
//         res.status(200).json({ message: "User authenticated successfully" });
//       } else {
//         res.status(401).json({
//           error: "Invalid username or password",
//           // p: password,
//           // l: password.length,
//           // K: IPV,
//           // S: storedHashedPassword,
//         });
//       }
//     }
//   } catch (error) {
//     console.error("An error occurred during login:", error);
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

app.get("/api/public/Procurement", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "public"."Procurement"');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching procurement details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// // Procurement details route - Add new procurement details
// app.post("/api/public/Procurement", async (req, res) => {
//   const {
//     procurement_id,
//     supply_order_id,
//     purchase_date,
//     purchase_price,
//     vendor_price,
//     invoice_id,
//     challan_id,
//   } = req.body;

//   try {
//     await pool.query(
//       'INSERT INTO "public"."Procurement" (procurement_id, supply_order_id, purchase_date, purchase_price, vendor_price, invoice_id, challan_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
//       [
//         procurement_id,
//         supply_order_id,
//         purchase_date,
//         purchase_price,
//         vendor_price,
//         invoice_id,
//         challan_id,
//       ]
//     );
//     res.status(201).json({ message: "Procurement details added successfully" });
//   } catch (error) {
//     console.error("Error adding procurement details:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Procurement details route - Update procurement details
// app.put("/api/public/Procurement/:id", async (req, res) => {
//   const id = req.params.id;
//   const {
//     procurement_id,
//     supply_order_id,
//     purchase_date,
//     purchase_price,
//     vendor_price,
//     invoice_id,
//     challan_id,
//   } = req.body;

//   try {
//     await pool.query(
//       'UPDATE "public"."Procurement" SET procurement_id = $1, supply_order_id = $2, purchase_date = $3, purchase_price = $4, vendor_price = $5, invoice_id = $6, challan_id = $7 WHERE id = $8',
//       [
//         procurement_id,
//         supply_order_id,
//         purchase_date,
//         purchase_price,
//         vendor_price,
//         invoice_id,
//         challan_id,
//         id,
//       ]
//     );
//     res.json({ message: "Procurement details updated successfully" });
//   } catch (error) {
//     console.error("Error updating procurement details:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Procurement details route - Delete procurement details
app.delete("/api/public/Procurement/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await pool.query('DELETE FROM "public"."Procurement" WHERE id = $1', [id]);
    res.json({ message: "Procurement details deleted successfully" });
  } catch (error) {
    console.error("Error deleting procurement details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

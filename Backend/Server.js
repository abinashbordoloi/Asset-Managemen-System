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




{/*                          Asset Screen                                     */}

//to show asset table
app.get("/api/public/Asset", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public."Asset"');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//to add asset
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

//update a asset
app.put("/assets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      desciption,
      serial_no,
      location,
      category,
      procurement,
      installtion,
      insurance,
      warranty,
      tagging_status,
      remarks,
    } = req.body;
    const updateAsset = await pool.query(
      "UPDATE asset SET desciption = $1, serial_no = $2, location = $3, category = $4, procurement = $5, installtion = $6, insurance = $7, warranty = $8, tagging_status = $9, remarks = $10 WHERE asset_id = $11",
      [
        desciption,
        serial_no,
        location,
        category,
        procurement,
        installtion,
        insurance,
        warranty,
        tagging_status,
        remarks,
        asset_id,
      ]
    );

    res.json("Asset was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a asset
app.delete("/api/public/Assetdelete/:asset_id", async (req, res) => {
  try {
    console.log("try block");
    const { asset_id } = req.params;
    const deleteAsset = await pool.query(
      'DELETE FROM public."Asset" WHERE asset_id = $1',
      [asset_id]
    );
    console.log(deleteAsset);
    res.status(204).send(); // Use 204 No Content for successful deletion
  } catch (err) {
    console.error("Error deleting asset:", err);
    res.status(500).json({ error: "Failed to delete asset." }); // Use 500 Internal Server Error for failures
  }
});






{/*                          Supply Order Screen                                     */} 

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

// to update supply order
app.put('/api/public/SupplyOrder/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { supply_order_no, supply_order_date, price } = req.body;

    const updateQuery = `
      UPDATE public."SupplyOrder"
      SET supply_order_no = $1, supply_order_date = $2, price = $3
      WHERE id = $4
    `;

    await pool.query(updateQuery, [supply_order_no, supply_order_date, price, id]);

    res.status(200).json({ message: 'Supply order updated successfully!' });
  } catch (error) {
    console.error('Error updating supply order:', error);
    res.status(500).json({ error: 'Failed to update supply order.' });
  }
});





{/*                          Location Entry Screen                                     */}     

//to get location
app.get('/api/public/Location', async (req, res) => {
  try {
    const fetchLocationsQuery = `
      SELECT * FROM public."Location"
    `;
    const locations = await pool.query(fetchLocationsQuery);
    res.status(200).json(locations.rows);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Failed to fetch locations.' });
  }
});

//to add location
app.post('/api/public/add-Location', async (req, res) => {
  try {
    const { name, address, city, state, country } = req.body;
    const insertLocationQuery = `
      INSERT INTO public."Location" (name, address, city, state, country)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [name, address, city, state, country];
    const newLocation = await pool.query(insertLocationQuery, values);
    res.status(201).json(newLocation.rows[0]);
  } catch (error) {
    console.error("Error adding location:", error);
    res.status(500).json({ error: "Failed to add location. Please try again later." });
  }
});

//to edit location
app.put('/api/public/Location/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, city, state, country } = req.body;

    // Perform the update operation in the database
    const updateQuery = `
      UPDATE public."Location"
      SET name = $1, address = $2, city = $3, state = $4, country = $5
      WHERE id = $6
    `;

    await pool.query(updateQuery, [name, address, city, state, country, id]);

    res.status(200).json({ message: 'Location updated successfully!' });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Failed to update location.' });
  }
});





{/*                          Category Screen                            */}                                           


//to get category
app.get("/api/public/Category", async (req, res) => {
  try {
    const fetchCategoriesQuery = `
      SELECT * FROM public."Category"
    `;
    const categories = await pool.query(fetchCategoriesQuery);
    res.status(200).json(categories.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories.' });
  }
});
 
//to add category
app.post('/api/public/add-Category', async (req, res) => {
  try {
    const { name, description } = req.body;
    const insertCategoryQuery = `
      INSERT INTO public."Category" (name, description)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [name, description];
    const newCategory = await pool.query(insertCategoryQuery, values);
    res.status(201).json(newCategory.rows[0]);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Failed to add category. Please try again later." });
  }
});

//to update category
app.put('/api/public/Category/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updateQuery = `
      UPDATE public."Category"
      SET name = $1, description = $2
      WHERE id = $3
    `;

    await pool.query(updateQuery, [name, description, id]);

    res.status(200).json({ message: 'Category updated successfully!' });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category.' });
  }
});



{/*                          Challan Screen                            */}  

//to get challan (check)
app.get("/api/public/Challan", async (req, res) => {
  try {
    const fetchChallansQuery = `
      SELECT * FROM public."Challan"
    `;
    const challans = await pool.query(fetchChallansQuery);
    res.status(200).json(challans.rows);
  } catch (error) {
    console.error('Error fetching challans:', error);
    res.status(500).json({ error: 'Failed to fetch challans.' });
  }
});

//to add new challan
app.post('/api/public/add-Challan', async (req, res) => {
  try {
    const { challan_details } = req.body;

    const insertChallanQuery = `
      INSERT INTO public."Challan" (challan_details)
      VALUES ($1)
      RETURNING *
    `;

    const values = [challan_details];
    const newChallan = await pool.query(insertChallanQuery, values);
    res.status(201).json(newChallan.rows[0]);
  } catch (error) {
    console.error("Error adding challan:", error);
    res.status(500).json({ error: "Failed to add challan. Please try again later." });
  }
});


//to update challan

app.put('/api/public/Challan/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { challan_details } = req.body;
    const updateQuery = `
      UPDATE public."Challan"
      SET challan_details = $1
      WHERE id = $2
    `;

    await pool.query(updateQuery, [challan_details, id]);

    res.status(200).json({ message: 'Challan updated successfully!' });
  } catch (error) {
    console.error('Error updating challan:', error);
    res.status(500).json({ error: 'Failed to update challan.' });
  }
});

{/*                          Description Screen                            */}  

//to get description
app.get("/api/public/Description", async (req, res) => {
  try {
    const fetchDescriptionsQuery = `
      SELECT * FROM public."Description"
    `;
    const descriptions = await pool.query(fetchDescriptionsQuery);
    res.status(200).json(descriptions.rows);
  } catch (error) {
    console.error('Error fetching descriptions:', error);
    res.status(500).json({ error: 'Failed to fetch descriptions.' });
  }
});

//to add description
app.post('/api/public/add-Description', async (req, res) => {
  try {
    const { make, specification, model } = req.body;
    const insertDescriptionQuery = `
      INSERT INTO public."Description" (make, specification, model)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [make, specification, model];
    const newDescription = await pool.query(insertDescriptionQuery, values);
    res.status(201).json(newDescription.rows[0]);
  } catch (error) {
    console.error("Error adding description:", error);
    res.status(500).json({ error: "Failed to add description. Please try again later." });
  }
});

//to update description
app.put('/api/public/Description/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { make, specification, model } = req.body;
    const updateQuery = `
      UPDATE public."Description"
      SET make = $1, specification = $2, model = $3
      WHERE id = $4
    `;

    await pool.query(updateQuery, [make, specification, model, id]);

    res.status(200).json({ message: 'Description updated successfully!' });
  } catch (error) {
    console.error('Error updating description:', error);
    res.status(500).json({ error: 'Failed to update description.' });
  }
});



{/*                         Login Screen                            */} 
           

//login password
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

// Logout Screen

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

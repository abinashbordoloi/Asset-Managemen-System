//@ts-nocheck
const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
console.log("JWT secret:", jwtSecret);

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

{
  /*                          Asset Screen                                     */
}

// To get assets
app.get("/api/public/Asset", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public."Asset"');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//route for home page enpoints




// To edit an asset
app.put("/api/public/Asset/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      description,
      serial_no,
      location,
      category,
      procurement,
      installation,
      insurance,
      warranty,
      tagging_status,
      remarks,
      supplyOrder,
      challan,
      physicalStatus,
      asset_id,
      waranty_start_date,
      warranty_end_date,
    } = req.body;
    const updateAsset = await pool.query(
      `UPDATE public."Asset"
       SET description = $1, serial_no = $2, location = $3, category = $4, procurement = $5,
           installation = $6, insurance = $7, warranty = $8, tagging_status = $9, remarks = $10,
           "supplyOrder" = $11, challan = $12, "physicalStatus" = $13, asset_id = $14,
           waranty_start_date = $15, warranty_end_date = $16
       WHERE id = $17`,
      [
        description,
        serial_no,
        location,
        category,
        procurement,
        installation,
        insurance,
        warranty,
        tagging_status,
        remarks,
        supplyOrder,
        challan,
        physicalStatus,
        asset_id,
        waranty_start_date,
        warranty_end_date,
        id,
      ]
    );

    res.json("Asset was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update asset." });
  }
});

// To delete an asset
app.delete("/api/public/Asset/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAsset = await pool.query(
      'DELETE FROM public."Asset" WHERE id = $1',
      [id]
    );
    res.status(204).send(); // Use 204 No Content for successful deletion
  } catch (err) {
    console.error("Error deleting asset:", err);
    res.status(500).json({ error: "Failed to delete asset." });
  }
});

// To add a new asset
app.post("/api/public/add-Asset", async (req, res) => {
  try {
    const {
      description,
      serial_no,
      location,
      category,
      procurement,
      installation,
      insurance,
      warranty,
      remarks,
      supplyOrder,
      challan,
      asset_id,
      waranty_start_date,
      warranty_end_date,
      tagging_status,
      physicalStatus,
    } = req.body;

    // Validate if the selected foreign keys exist in their respective tables
    const descriptionExists = await pool.query(
      'SELECT * FROM public."Description" WHERE id = $1',
      [description]
    );
    const categoryExists = await pool.query(
      'SELECT * FROM public."Category" WHERE id = $1',
      [category]
    );
    const challanExists = await pool.query(
      'SELECT * FROM public."Challan" WHERE id = $1',
      [challan]
    );
    const installationExists = await pool.query(
      'SELECT * FROM public."Installation" WHERE id = $1',
      [installation]
    );
    const insuranceExists = await pool.query(
      'SELECT * FROM public."Insurance" WHERE id = $1',
      [insurance]
    );
    const locationExists = await pool.query(
      'SELECT * FROM public."Location" WHERE id = $1',
      [location]
    );
    const supplyOrderExists = await pool.query(
      'SELECT * FROM public."SupplyOrder" WHERE id = $1',
      [supplyOrder]
    );

    if (descriptionExists.rows.length === 0) {
      return res.status(400).json({ error: "Selected description does not exist." });
    }

    if (categoryExists.rows.length === 0) {
      return res.status(400).json({ error: "Selected category does not exist." });
    }

    if (challanExists.rows.length === 0) {
      return res.status(400).json({ error: "Selected challan does not exist." });
    }

    if (installationExists.rows.length === 0) {
      return res.status(400).json({ error: "Selected installation does not exist." });
    }

    if (insuranceExists.rows.length === 0) {
      return res.status(400).json({ error: "Selected insurance does not exist." });
    }

    if (locationExists.rows.length === 0) {
      return res.status(400).json({ error: "Selected location does not exist." });
    }

    if (supplyOrderExists.rows.length === 0) {
      return res.status(400).json({ error: "Selected supplyOrder does not exist." });
    }

    // If all foreign keys exist, insert the asset record
    const insertAssetQuery = `
      INSERT INTO public."Asset" (description, serial_no, location, category, procurement, installation, insurance, warranty, remarks, "supplyOrder", challan, asset_id, waranty_start_date, warranty_end_date, tagging_status, "physicalStatus")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
    `;
    const values = [
      description,
      serial_no,
      location,
      category,
      procurement,
      installation,
      insurance,
      warranty,
      remarks,
      supplyOrder,
      challan,
      asset_id,
      waranty_start_date,
      warranty_end_date,
      tagging_status,
      physicalStatus,
    ];
    const newAsset = await pool.query(insertAssetQuery, values);

    res.status(201).json(newAsset.rows[0]);
  } catch (error) {
    console.error("Error adding asset:", error);
    res.status(500).json({ error: "Failed to add asset. Please try again later." });
  }
});


{
  /*                          Supply Order Screen                                     */
}

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
app.put("/api/public/SupplyOrder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { supply_order_no, supply_order_date, price } = req.body;

    const updateQuery = `
      UPDATE public."SupplyOrder"
      SET supply_order_no = $1, supply_order_date = $2, price = $3
      WHERE id = $4
    `;

    await pool.query(updateQuery, [
      supply_order_no,
      supply_order_date,
      price,
      id,
    ]);

    res.status(200).json({ message: "Supply order updated successfully!" });
  } catch (error) {
    console.error("Error updating supply order:", error);
    res.status(500).json({ error: "Failed to update supply order." });
  }
});

//to add supply order
app.post("/api/public/add-SupplyOrder", async (req, res) => {
  try {
    const { supply_order_no, supply_order_date, price } = req.body;
    const insertSupplyOrderQuery = `
      INSERT INTO public."SupplyOrder" (supply_order_no, supply_order_date, price)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [supply_order_no, supply_order_date, price];
    const newSupplyOrder = await pool.query(insertSupplyOrderQuery, values);
    res.status(201).json(newSupplyOrder.rows[0]);
  } catch (error) {
    console.error("Error adding Supply Order:", error);
    res
      .status(500)
      .json({ error: "Failed to add Supply Order. Please try again later." });
  }
});

{
  /*                          Location Entry Screen                                     */
}

//to get location
app.get("/api/public/Location", async (req, res) => {
  try {
    const fetchLocationsQuery = `
      SELECT * FROM public."Location"
    `;
    const locations = await pool.query(fetchLocationsQuery);
    res.status(200).json(locations.rows);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ error: "Failed to fetch locations." });
  }
});

//to add location
app.post("/api/public/add-Location", async (req, res) => {
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
    res
      .status(500)
      .json({ error: "Failed to add location. Please try again later." });
  }
});

//to edit location
app.put("/api/public/Location/:id", async (req, res) => {
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

    res.status(200).json({ message: "Location updated successfully!" });
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ error: "Failed to update location." });
  }
});

{
  /*                          Category Screen                            */
}

//to get category
app.get("/api/public/Category", async (req, res) => {
  try {
    const fetchCategoriesQuery = `
      SELECT * FROM public."Category"
    `;
    const categories = await pool.query(fetchCategoriesQuery);
    res.status(200).json(categories.rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories." });
  }
});

//to add category
app.post("/api/public/add-Category", async (req, res) => {
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
    res
      .status(500)
      .json({ error: "Failed to add category. Please try again later." });
  }
});

//to update category
app.put("/api/public/Category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updateQuery = `
      UPDATE public."Category"
      SET name = $1, description = $2
      WHERE id = $3
    `;

    await pool.query(updateQuery, [name, description, id]);

    res.status(200).json({ message: "Category updated successfully!" });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category." });
  }
});

{
  /*                          Challan Screen                            */
}

//to get challan (check)
app.get("/api/public/Challan", async (req, res) => {
  try {
    const fetchChallansQuery = `
      SELECT * FROM public."Challan"
    `;
    const challans = await pool.query(fetchChallansQuery);
    res.status(200).json(challans.rows);
  } catch (error) {
    console.error("Error fetching challans:", error);
    res.status(500).json({ error: "Failed to fetch challans." });
  }
});

//to add new challan
app.post("/api/public/add-Challan", async (req, res) => {
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
    res
      .status(500)
      .json({ error: "Failed to add challan. Please try again later." });
  }
});

//to update challan

app.put("/api/public/Challan/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { challan_details } = req.body;
    const updateQuery = `
      UPDATE public."Challan"
      SET challan_details = $1
      WHERE id = $2
    `;

    await pool.query(updateQuery, [challan_details, id]);

    res.status(200).json({ message: "Challan updated successfully!" });
  } catch (error) {
    console.error("Error updating challan:", error);
    res.status(500).json({ error: "Failed to update challan." });
  }
});

{
  /*                          Description Screen                            */
}

//to get description
app.get("/api/public/Description", async (req, res) => {
  try {
    const fetchDescriptionsQuery = `
      SELECT * FROM public."Description"
    `;
    const descriptions = await pool.query(fetchDescriptionsQuery);
    res.status(200).json(descriptions.rows);
  } catch (error) {
    console.error("Error fetching descriptions:", error);
    res.status(500).json({ error: "Failed to fetch descriptions." });
  }
});

//to add description
app.post("/api/public/add-Description", async (req, res) => {
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
    res
      .status(500)
      .json({ error: "Failed to add description. Please try again later." });
  }
});

//to update description
app.put("/api/public/Description/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { make, specification, model } = req.body;
    const updateQuery = `
      UPDATE public."Description"
      SET make = $1, specification = $2, model = $3
      WHERE id = $4
    `;

    await pool.query(updateQuery, [make, specification, model, id]);

    res.status(200).json({ message: "Description updated successfully!" });
  } catch (error) {
    console.error("Error updating description:", error);
    res.status(500).json({ error: "Failed to update description." });
  }
});

{
  /*                         Installation Screen                            */
}

// to get installations
app.get("/api/public/Installation", async (req, res) => {
  try {
    const fetchInstallationsQuery = `
      SELECT * FROM public."Installation"
    `;
    const installations = await pool.query(fetchInstallationsQuery);
    res.status(200).json(installations.rows);
  } catch (error) {
    console.error("Error fetching installations:", error);
    res.status(500).json({ error: "Failed to fetch installations." });
  }
});

//to add installation
app.post("/api/public/add-Installation", async (req, res) => {
  try {
    const { installation_date, commissioning_date } = req.body;
    const insertInstallationQuery = `
      INSERT INTO public."Installation" (installation_date, commissioning_date)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [installation_date, commissioning_date];
    const newInstallation = await pool.query(insertInstallationQuery, values);
    res.status(201).json(newInstallation.rows[0]);
  } catch (error) {
    console.error("Error adding installation:", error);
    res
      .status(500)
      .json({ error: "Failed to add installation. Please try again later." });
  }
});

//to edit installation
app.put("/api/public/Installation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { installation_date, commissioning_date } = req.body;
    const updateQuery = `
      UPDATE public."Installation"
      SET installation_date = $1, commissioning_date = $2
      WHERE id = $3
    `;

    await pool.query(updateQuery, [installation_date, commissioning_date, id]);

    res.status(200).json({ message: "Installation updated successfully!" });
  } catch (error) {
    console.error("Error updating installation:", error);
    res.status(500).json({ error: "Failed to update installation." });
  }
});

{
  /*                         Insurance Screen                            */
}

//to get insurance
app.get("/api/public/Insurance", async (req, res) => {
  try {
    const fetchInsurancesQuery = `
      SELECT * FROM public."Insurance"
    `;
    const insurances = await pool.query(fetchInsurancesQuery);
    res.status(200).json(insurances.rows);
  } catch (error) {
    console.error("Error fetching insurances:", error);
    res.status(500).json({ error: "Failed to fetch insurances." });
  }
});

//to add new insurance
app.post("/api/public/add-Insurance", async (req, res) => {
  try {
    const {
      start_date,
      end_date,
      insurance_company,
      insurance_no,
      insurance_period,
    } = req.body;
    const insertInsuranceQuery = `
      INSERT INTO public."Insurance" (start_date, end_date, insurance_company, insurance_no, insurance_period)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [
      start_date,
      end_date,
      insurance_company,
      insurance_no,
      insurance_period,
    ];
    const newInsurance = await pool.query(insertInsuranceQuery, values);
    res.status(201).json(newInsurance.rows[0]);
  } catch (error) {
    console.error("Error adding insurance:", error);
    res
      .status(500)
      .json({ error: "Failed to add insurance. Please try again later." });
  }
});

//to update insurance
app.put("/api/public/Insurance/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      start_date,
      end_date,
      insurance_company,
      insurance_no,
      insurance_period,
    } = req.body;
    const updateQuery = `
      UPDATE public."Insurance"
      SET start_date = $1, end_date = $2, insurance_company = $3, insurance_no = $4, insurance_period = $5
      WHERE id = $6
    `;

    await pool.query(updateQuery, [
      start_date,
      end_date,
      insurance_company,
      insurance_no,
      insurance_period,
      id,
    ]);

    res.status(200).json({ message: "Insurance updated successfully!" });
  } catch (error) {
    console.error("Error updating insurance:", error);
    res.status(500).json({ error: "Failed to update insurance." });
  }
});

{
  /*                         Invoice Screen                            */
}
// Get all invoices
app.get("/api/public/Invoice", async (req, res) => {
  try {
    const fetchInvoicesQuery = `
      SELECT * FROM public."Invoice"
    `;
    const invoices = await pool.query(fetchInvoicesQuery);
    res.status(200).json(invoices.rows);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Failed to fetch invoices." });
  }
});

// Add a new invoice
app.post("/api/public/add-Invoice", async (req, res) => {
  try {
    const { invoice_details } = req.body;
    const insertInvoiceQuery = `
      INSERT INTO public."Invoice" (invoice_details)
      VALUES ($1)
      RETURNING *
    `;
    const values = [invoice_details];
    const newInvoice = await pool.query(insertInvoiceQuery, values);
    res.status(201).json(newInvoice.rows[0]);
  } catch (error) {
    console.error("Error adding invoice:", error);
    res
      .status(500)
      .json({ error: "Failed to add invoice. Please try again later." });
  }
});

// Update an existing invoice
app.put("/api/public/Invoice/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { invoice_details } = req.body;
    const updateQuery = `
      UPDATE public."Invoice"
      SET invoice_details = $1
      WHERE id = $2
    `;

    await pool.query(updateQuery, [invoice_details, id]);

    res.status(200).json({ message: "Invoice updated successfully!" });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ error: "Failed to update invoice." });
  }
});


{
  /*                        Procurement Screen */
}
// to get procurements
app.get("/api/public/Procurement", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public."Procurement"');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching procurements:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//to edit procurement
app.put("/api/public/Procurement/:procurement_id", async (req, res) => {
  try {
    const { procurement_id } = req.params;
    const {
      supply_order_id,
      purchase_date,
      purchase_price,
      vendor_id,
      invoice_id,
      challan_id,
    } = req.body;
    const updateProcurement = await pool.query(
      `UPDATE public."Procurement"
       SET supply_order_id = $1, purchase_date = $2, purchase_price = $3, vendor_id = $4, invoice_id = $5, challan_id = $6
       WHERE procurement_id = $7`,
      [
        supply_order_id,
        purchase_date,
        purchase_price,
        vendor_id,
        invoice_id,
        challan_id,
        procurement_id,
      ]
    );

    res.json("Procurement was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update procurement." });
  }
});
//to delete procurement
app.delete("/api/public/Procurement/:procurement_id", async (req, res) => {
  try {
    const { procurement_id } = req.params;
    const deleteProcurement = await pool.query(
      'DELETE FROM public."Procurement" WHERE procurement_id = $1',
      [procurement_id]
    );
    res.status(204).send(); // Use 204 No Content for successful deletion
  } catch (err) {
    console.error("Error deleting procurement:", err);
    res.status(500).json({ error: "Failed to delete procurement." });
  }
});

//to add new Procurement
app.post("/api/public/add-Procurement", async (req, res) => {
  try {
    const {
      supply_order_id,
      purchase_date,
      purchase_price,
      vendor_id,
      invoice_id,
      challan_id,
    } = req.body;

    // Validate if the selected vendor_id, invoice_id, and challan_id exist in their respective tables
    const vendorExists = await pool.query(
      'SELECT * FROM public."Vendor" WHERE id = $1',
      [vendor_id]
    );
    const invoiceExists = await pool.query(
      'SELECT * FROM public."Invoice" WHERE id = $1',
      [invoice_id]
    );
    const challanExists = await pool.query(
      'SELECT * FROM public."Challan" WHERE id = $1',
      [challan_id]
    );

    if (vendorExists.rows.length === 0) {
      return res.status(400).json({ error: "Selected vendor does not exist." });
    }

    if (invoiceExists.rows.length === 0) {
      return res
        .status(400)
        .json({ error: "Selected invoice does not exist." });
    }

    if (challanExists.rows.length === 0) {
      return res
        .status(400)
        .json({ error: "Selected challan does not exist." });
    }

    // If all foreign keys exist, insert the procurement record
    const insertProcurementQuery = `
      INSERT INTO public."Procurement" (supply_order_id, purchase_date, purchase_price, vendor_id, invoice_id, challan_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      supply_order_id,
      purchase_date,
      purchase_price,
      vendor_id,
      invoice_id,
      challan_id,
    ];
    const newProcurement = await pool.query(insertProcurementQuery, values);

    res.status(201).json(newProcurement.rows[0]);
  } catch (error) {
    console.error("Error adding procurement:", error);
    res
      .status(500)
      .json({ error: "Failed to add procurement. Please try again later." });
  }
});

{
  /*                        Vendor Screen        */
}
//to get vendors
app.get("/api/public/Vendor", async (req, res) => {
  try {
    const fetchVendorsQuery = `
      SELECT * FROM public."Vendor"
    `;
    const vendors = await pool.query(fetchVendorsQuery);
    res.status(200).json(vendors.rows);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ error: "Failed to fetch vendors." });
  }
});

//to  add new vendor
app.post("/api/public/add-Vendor", async (req, res) => {
  try {
    const { name, address, city, state, country } = req.body;
    const insertVendorQuery = `
      INSERT INTO public."Vendor" (name, address, city, state, country)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [name, address, city, state, country];
    const newVendor = await pool.query(insertVendorQuery, values);
    res.status(201).json(newVendor.rows[0]);
  } catch (error) {
    console.error("Error adding vendor:", error);
    res
      .status(500)
      .json({ error: "Failed to add vendor. Please try again later." });
  }
});

//to update vendor
app.put("/api/public/Vendor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, city, state, country } = req.body;

    // Perform the update operation in the database
    const updateQuery = `
      UPDATE public."Vendor"
      SET name = $1, address = $2, city = $3, state = $4, country = $5
      WHERE id = $6
    `;

    await pool.query(updateQuery, [name, address, city, state, country, id]);

    res.status(200).json({ message: "Vendor updated successfully!" });
  } catch (error) {
    console.error("Error updating vendor:", error);
    res.status(500).json({ error: "Failed to update vendor." });
  }
});

{
  /*                         User Screen                            */
}
//to display users
app.get("/api/public/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.passwords");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//register endpoints
app.post("/api/public/register", async (req, res) => {
  console.log("Register request received:", req.body);
  const { username, password, role } = req.body;

  try {
    //Check if the user already exists
    const result = await pool.query(
      'SELECT * FROM public."passwords" WHERE username = $1',
      [username]
    );

    if (result.rows.length > 0) {
      res.status(409).json({ error: "User already exists" });
      alert("User already exists");
    } else {
      //If the user does not exist, hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      //Insert the user into the database
      const insertUserQuery = 'INSERT INTO public.passwords (username, password_hash, role) VALUES ($1, $2, $3)';
      const values = [username, hashedPassword, role];
      await pool.query(insertUserQuery, values);

      res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});






//Login endpoints
app.post("/api/public/login", async (req, res) => {
  console.log("Login request received:", req.body);
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT id, password_hash, role FROM public."passwords" WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ error: "Invalid username or password" });
    } else {
      const sotoredHashedPassword = result.rows[0].password_hash;
      const user = {
        id: result.rows[0].id,
        roles: result.rows[0].roles,
      };

      const isPasswordValid = await bcrypt.compare(
        password,
        sotoredHashedPassword
      );

      if (isPasswordValid) {
        //If authentication is successful, generate a JWT token for the user with a secret key
        const token = jwt.sign(
          { userId: user.id, roles: user.roles },
          jwtSecret,
          {
            expiresIn: "2h", //Token expiration time
          }
        )
        console.log("Token generated:", token)
        
        ;

        //return the token to the client
        res.status(200).json({ token });
        //check the res in the console
      
        
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




//Protected route for token verification
app.get("/api/public/verifyToken", (req, res) => {
  console.log("Token verification request received:", req.body);

  const token = req.header("Authorization")?.split(" ")[1];
  console.log(token);

  console.log("Token received:", token);

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
  

    res.status(200).json({ message: "Token verified succeessfully" });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Token verification failed, Invalid token" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
// Middleware
app.use(cors());
app.use(express.json()); // req.body

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

//Routes//



//add user and password
app.post("/users/create", async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const newUser = await pool.query("INSERT INTO public.users (username, email, password, role) VALUES($1, $2, $3, $4) RETURNING *",
            [username, email, password, role]
        );

    res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//display users
app.get("/users", async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM public.users');
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a user
app.get("/users/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM public.users WHERE id = $1', [id]);

        res.json(user.rows[0]);

    }catch(err){
        console.log(err.message);
    }

});



// update a user
app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, role } = req.body;
        const updateUser = await pool.query("UPDATE public.users SET username = $1, email = $2, password = $3, role = $4 WHERE id = $5",
            [username, email, password, role, id]
        );

        res.json("User was updated!");
    } catch (err) {
        console.error(err.message);
    }
}
);


//create a asset
app.post("/assets", async (req, res) => {
    try {
       
        const { asset_id, desciption, serial_no, location, category, procurement, installtion, insurance,warranty,tagging_status,remarks } = req.body;
        const newAsset = await pool.query("INSERT INTO asset (asset_id, desciption, serial_no, location, category, procurement, installtion, insurance,warranty,tagging_status, remarks) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11) RETURNING *",
            [asset_id, desciption, serial_no, location, category, procurement, installtion, insurance,warranty,tagging_status, remarks]
        );

    res.json(newAsset.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all assets
app.get("/assets", async (req, res) => {
    try {
        const allAssets = await pool.query('SELECT * FROM public."Asset"');
        res.json(allAssets.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//get a asset
app.get("/assets/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const asset = await pool.query('SELECT * FROM public."Asset" WHERE Asset_ID = $1', [id]);

        res.json(asset.rows[0]);
      
    }catch(err){
        console.log(err.message);
    }
 
});


//update a asset
app.put("/assets/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { desciption, serial_no, location, category, procurement, installtion, insurance,warranty,tagging_status, remarks} = req.body;
        const updateAsset = await pool.query("UPDATE asset SET desciption = $1, serial_no = $2, location = $3, category = $4, procurement = $5, installtion = $6, insurance = $7, warranty = $8, tagging_status = $9, remarks = $10 WHERE asset_id = $11");
            [desciption, serial_no, location, category, procurement, installtion, insurance,warranty,tagging_status, remarks, id];

        res.json("Asset was updated!");
    } catch (err) {
        console.error(err.message);
    }
}
);


//delete a asset
app.delete("/assets/:id", async (req, res) => { 
    try {
        const { id } = req.params;
        const deleteAsset = await pool.query("DELETE FROM asset WHERE asset_id = $1", [id]);
        res.json("Asset was deleted!");
    } catch (err) {
        console.log(err.message);
    }
}
);

//get supply order of a asset i have i forien key suplplyorder in asset which is refering to ID of supplyorder table
app.get("/assets/:id/supplyorder", async (req, res) => {
    try {
        const { id } = req.params;
        const supplyorder = await pool.query("SELECT * FROM  assets a supplyorder s WHERE a.supply  = $1", [id]);
        res.json(supplyorder.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
}
);

//get all supply order
app.get("/supplyorder", async (req, res) => {
    try {
        const allSupplyorder = await pool.query("SELECT * FROM supplyorder");
        res.json(allSupplyorder.rows);
    } catch (err) {
        console.error(err.message);
    }
}
);


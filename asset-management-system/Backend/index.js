const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json()); // req.body

app.listen(5000, () => {
  console.log("Server running on port 3000");
});

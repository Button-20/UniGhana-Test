require('./models/db')
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

// Set up the express app
const port = 4000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Require the controllers
const jwtHelper = require("./config/jwtHelper");
const { create, authenticate, profile} = require("./controllers/user.controller");

// Routes
app.get("/api", (req, res) => res.send("Hello World!"));

app.post("/api/login", authenticate);

app.post("/api/register", create);

app.get("/api/user", jwtHelper.verifyJwtToken, profile);
// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}!`));

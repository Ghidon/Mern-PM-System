//Creates an Express application.
//The express() function is a top - level function exported by the express module.
const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/routing"));
// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

//Here, we are requiring express and cors to be used.
//const port process.env.port will access the port variable
//from the config.env we required.

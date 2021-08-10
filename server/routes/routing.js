const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("users")
    .findOne({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

// This section will help you get a user by email and password.
recordRoutes.route("/users/login").post(function (req, res) {
  let myEmail = { email: `${req.body.email}` };
  let myPassword = { password: `${req.body.password}` };

  let db_connect = dbo.getDb("employees");
  db_connect.collection("users").findOne(myEmail, function (err, result) {
    if (err) throw err;
    // console.log(result);
    if (result) {
      if ((myPassword = result.password)) {
        let access_token = generateAccessToken({
          first_name: result["first_name"],
          last_name: result["last_name"],
          email: result["email"],
          created: result["created"],
        });
        console.log(access_token);
        res.json(access_token);
        console.log("password match");
      } else {
        res.json({ error: "Wrong Password or Email" });
      }
    } else {
      res.json({ error: "Wrong Email or password" });
    }
  });
});

// This section will help you get a record by Id.
recordRoutes.route("/record/:id").get(function (req, res) {
  const ObjectId = require("mongodb").ObjectId;
  let myquery = req.params.id;
  let id = new ObjectId(myquery);
  let db_connect = dbo.getDb("employees");
  db_connect.collection("users").findOne(id, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
recordRoutes.route("/users/register").post(function (req, res) {
  let db_connect = dbo.getDb("users");
  // crypting password
  const passwordHash = bcrypt.hashSync(req.body.password, 10);

  // creating an object with user details and crypted password
  let myobj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: passwordHash,
  };

  async function run() {
    let email = { email: `${req.body.email}` };
    try {
      const checkEmail = await db_connect.collection("users").findOne(email);
      if (checkEmail) {
        console.log("a document with that email was found");
        res.status(400);
        throw new Error("email already registered");
      } else {
        db_connect.collection("users").insertOne(myobj, function (err, res) {
          if (err) throw err;
        });
        console.log("All good, no other document with that email");
        res.status(201).json({
          email: req.body.email,
          password: req.body.password,
        });
      }
    } finally {
    }
  }
  return run().catch(console.dir);
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, res) {
  let db_connect = dbo.getDb("employees");
  let myquery = { id: req.body.id };
  let newvalues = {
    $set: {
      person_name: req.body.person_name,
      person_position: req.body.person_position,
      person_level: req.body.person_level,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, res) => {
  let db_connect = dbo.getDb("employees");
  var myquery = { id: req.body.id };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
  });
});

module.exports = recordRoutes;

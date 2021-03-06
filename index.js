require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? "./.env" : "./.env.development",
});

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = process.env.PORT || 8001;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "*",
    "https://analyzemysentiment.herokuapp.com/users/register"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token"
  );
  next();
});

app.get("/users", db.getUsers);

app.get("/users/:username", db.getUserById);

app.post("/users/register", db.createUser);

app.put("/users", db.updateUser);

app.delete("/users/:id", db.deleteUser);

app.post("/users/:user_id/scores", db.createScore);

app.get("/users/:user_id/scores", db.getUserScores);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

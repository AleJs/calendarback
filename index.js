const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("./database/config");
console.clear();
//bd
dbConnection();

//crear server

const app = express();

//cors
app.use(cors());

//directorio publico

app.use(express.static("public"));

//lectura y parseo body
app.use(express.json());

//route

app.use("/api/auth", require("./routers/auth"));
app.use("/api/events", require("./routers/events"));

//escuchar peticiones

app.listen(4000, () =>
  console.log(`Express server running on http://locahost:${process.env.PORT}`)
);

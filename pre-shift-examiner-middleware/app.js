const express = require('express');
const app = express();

const testingRouter = require("./routes/testing-router");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use("/api/testing", testingRouter)

app.use(function(req, res) {
  res.status(500).end()
});

module.exports = app;

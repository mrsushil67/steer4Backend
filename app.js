const express = require("express");
const app = express();
const MainRouter = require('./routes/mainRoute');
const bodyParser = require('body-parser');
const morgan = require("morgan");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use("/api/v1",MainRouter);

module.exports = app;
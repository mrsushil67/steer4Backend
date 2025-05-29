const express = require("express");
const app = express();
const MainRouter = require('./routes/mainRoute')

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use("/api/v1",MainRouter);

module.exports = app;
const express = require("express");
const app = express();
const DriverRoutes = require("./routes/driver.route");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use("/api/v1/driver", DriverRoutes);

module.exports = app;
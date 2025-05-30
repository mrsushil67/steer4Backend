const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const morgan = require("morgan");
var multer = require('multer');
var forms = multer();
const UserRouter = require("./routes/user.route");
const DriverRouter = require("./routes/driver.route");
const VehicleRouter = require("./routes/vehicle.route");
const CustomerRouter = require("./routes/customer.route");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(forms.array()); 
app.use(morgan('dev'));

app.use("/api/v1/user",UserRouter);
app.use("/api/v1/driver", DriverRouter);
app.use("/api/v1/vehicle", VehicleRouter);
app.use('/api/v1/customer', CustomerRouter);

module.exports = app;
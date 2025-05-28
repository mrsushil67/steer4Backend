const { Sequelize } = require("sequelize");
const { logg } = require("../utils/utils");

const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASS,
  {
    host: process.env.DBHOST,
    dialect: "mysql",
    logging: false
  }
);

sequelize
  .authenticate()
  .then(() => {
    logg.success("Database connection established successfully.");
  })
  .catch((error) => {
    logg.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;

const { DBMODELS } = require("../models/init-models");

module.exports.getVehicleList = async (req, res) => {
  try {
    const vehicles = await DBMODELS.Vehicle.findAll({})

    return res.status(200).json({total: vehicles.length, vehicles})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

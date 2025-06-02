const { Op } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.getVehicleList = async (req, res) => {
  try {
    const { vehicleNo = null || undefined } = req.body || {};

    const whereCondition = vehicleNo
      ? {
          VNumer: {
            [Op.like]: `%${vehicleNo}%`,
          },
        }
      : {};

    const vehicles = await DBMODELS.Vehicle.findAll({
      where: whereCondition,
      attributes: ["VehicleID", "VNumer"],
      limit: 20,
    });

    if (vehicles.length === 0) {
      return res
        .status(404)
        .json({ status: "404", message: "No Record found" });
    }

    return res
      .status(200)
      .json({ status: "200", message: "Record found", vehicles });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

module.exports.getVehicleSize = async (req, res) => {
  try {
    const { size = null || undefined } = req.body || {};

    const whereCondition = size
      ? {
          size_title: {
            [Op.like]: `%${size}%`,
          },
        }
      : {};

    const vehicleSize = await DBMODELS.Vehiclesize.findAll({
      where: whereCondition,
    });

    return res
      .status(200)
      .json({ status: "200", message: "Record found", vehicleSize });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

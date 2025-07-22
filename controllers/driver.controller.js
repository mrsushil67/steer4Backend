const { Op } = require("sequelize");
const { DBMODELS } = require("../models/init-models");
const { logg } = require("../utils/utils");

module.exports.getDriverLisence = async (req, res) => {
  try {
    const { Id } = req.params;
    const driver = await DBMODELS.Driver.findOne({
      where: { DriverID: Id },
      attributes: ["DName", "Licence"],
    });
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    return res
      .status(200)
      .json({ driver, message: "driver fetched successfully", status: true });
  } catch (error) {
    logg.error("Error fetching driver licence: " + error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

module.exports.getDriversList = async (req, res) => {
  try {
    const { VehicleID = null } = req.body || {}

    if (!VehicleID) {
      return res.status(400).json({ message: "VehicleID is required", status: false });
    }

    const assignedDrivers = await DBMODELS.DriverAssigntToVehicle.findAll({
      where: { Vid: VehicleID },
      attributes: ["Did"],
    });

    if (assignedDrivers.length === 0) {
      console.log("No drivers assigned to this vehicle");
      return res.status(404).json({ status: "404", message: "Not Assign Driver to this Vehicle"});
    }

    const driverIds = assignedDrivers.map((assignment) => assignment.Did);

    const drivers = await DBMODELS.Driver.findAll({
      where: { DriverID: { [Op.in]: driverIds } },
      attributes: ["DriverID", "DName", "Licence", "BlockStataus"],
    });

    console.log("Fetched drivers: ", drivers);

    if(drivers.BlockStataus === "2") {
      console.log("Driver is blocked");
      return res.status(403).json({ message: "Driver is blocked", status: false });
    }

    if (drivers.length === 0) {
      console.log("No drivers found for the given Driver IDs");
      return res.status(404).json({ message: "No drivers found for the given Driver IDs", status: false });
    }

    return res.status(200).json({status: "200", message: "Drivers fetched successfully", drivers});
  } catch (error) {
    console.error("Error fetching drivers list: ", error.message);
    return res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

// module.exports.getDriversList = async (req, res) => {
//   try {
//     const { VehicleID , name = null || undefined, licence = null || undefined } =
//       req.body || {};

//     const whereCondition =
//       name || licence
//         ? {
//             [Op.or]: {
//               DName: {
//                 [Op.like]: `%${name}%`,
//               },
//               Licence: {
//                 [Op.like]: `%${licence}%`,
//               },
//             },
//           }
//         : {};

//     const drivers = await DBMODELS.Driver.findAll({
//       where: whereCondition,
//       attributes: ["DriverID", "DName", "Licence"],
//       limit: 20,
//     });

//     if (drivers.length === 0) {
//       return res
//         .status(404)
//         .json({ status: "404", message: "Driver not found" });
//     }

//     const lengths = drivers.length;

//     return res.status(200).json({
//       status: "200",
//       lengths,
//       drivers,
//       message: "Drivers fetched successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: "500", message: "Internal server error" });
//   }
// };

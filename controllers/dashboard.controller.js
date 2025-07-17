const { where, Op } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.CustomerStatus = async (req, res) => {
  try {
    const totalCustomer = await DBMODELS.CustomerMaster.findAll();
    if (!Array.isArray(totalCustomer)) {
      throw new Error("Failed to retrieve customer data");
    }

    const totalDriver = await DBMODELS.Driver.findAll();
    if (!Array.isArray(totalDriver)) {
      throw new Error("Failed to retrieve driver data");
    }

    const setteled = await DBMODELS.TripPlan.findAll();
    if (!Array.isArray(setteled)) {
      throw new Error("Failed to retrieve trip plan data");
    }

    let countNull = 0;
    let countOne = 0;

    setteled.forEach((record) => {
      if (record.Is_Settled === null) {
        countNull++;
      } else if (record.Is_Settled === 1) {
        countOne++;
      }
    });

    const data = {
      totalCustomer: totalCustomer.length,
      totalDriver: totalDriver.length,
      settlement_trip: countOne,
      pending_settlement: countNull,
      totalpanding_rate: 0,
      total_invoice: 0,
    };

    return res.status(200).json({
      status: "200",
      message: "Record Found",
      data: data,
    });
  } catch (error) {
    console.error("Error in CustomerStatus:", {
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.VehicleStatus = async (req, res) => {
  try {

    const trips = await DBMODELS.TripPlan.findAll();
    const tripsgh = await DBMODELS.TripOperation.findAll({
      where: {
        TripNo: {
          [Op.like]: "%" + "A",
        },
      },
      include: {
        model: DBMODELS.TripPlan,
        as: "TripPlan",
        required: true,
      },
    });

    let completed = 0;
    let ongoing = 0;

    trips.forEach((record) => {
      if (record.Status === 7) {
        completed++;
      } else if (record.Status === 4) {
        ongoing++;
      }
    });

    let completedd = 0;
    let ongoingd = 0;

    tripsgh.forEach((record) => {
      if (record.Stat === 7) {
        completedd++;
      } else if (record.Stat === 4) {
        ongoingd++;
      }
    });

    const data = {
      active_vehicle: 0,
      broken_down_vehicle: 0,
      ongoing_travel: ongoing,
      completed_travel: completedd,
      delayed_travel: 0,
      vehicle_availability: 0
    };

    return res.status(200).json({
      status: "200",
      message: "Record Found",
      data: data,
    });
  } catch (error) {
    console.error("Error in VehicleStatus :", error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

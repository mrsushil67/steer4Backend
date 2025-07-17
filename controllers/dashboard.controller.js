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
    const tripPlan = await DBMODELS.TripPlan.findAll({
      where: {
        Is_Completed: 1,
      },
    });

    const trips = await DBMODELS.TripPlan.findAll();

     let completed = 0;
    let ongoing = 0;

    trips.forEach((record) => {
      if (record.Status === 7) {
        completed++;
      } else if (record.Status === 4) {
        ongoing++;
      }
    });

    const data = {
      Completed_travel: completed,
      ongoing_travel: ongoing
    }

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

const { Op } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.CustomerStatus = async (req, res) => {
  try {
    // Fetch required data concurrently
    const [customers, drivers, tripPlans, tripOperations] = await Promise.all([
      DBMODELS.CustomerMaster.findAll(),
      DBMODELS.Driver.findAll(),
      DBMODELS.TripPlan.findAll(),
      DBMODELS.TripOperation.findAll({
        where: {
          TripNo: {
            [Op.like]: "%A",
          },
        },
        include: {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          required: true,
        },
      }),
    ]);

    if (!customers || !drivers || !tripPlans || !tripOperations) {
      throw new Error("Failed to retrieve necessary data");
    }

    // Calculate settlement stats
    let settlement_trip = 0;
    let pending_settlement = 0;

    for (const trip of tripPlans) {
      if (trip.Is_Settled === 1) settlement_trip++;
      else if (trip.Is_Settled === null) pending_settlement++;
    }

    // Calculate travel status from TripPlan
    let ongoing_travel = 0;
    for (const trip of tripPlans) {
      if (trip.Status === 4) ongoing_travel++;
    }

    // Calculate completed travel from TripOperation
    let completed_travel = 0;
    for (const op of tripOperations) {
      if (op.Stat === 7) completed_travel++;
    }

    const data = {
      totalCustomer: customers.length,
      totalDriver: drivers.length,
      settlement_trip,
      pending_settlement,
      totalpanding_rate: 0,
      total_invoice: 0,
      active_vehicle: 0,
      broken_down_vehicle: 0,
      ongoing_travel,
      completed_travel,
      delayed_travel: 0,
      vehicle_availability: 0,
    };

    return res.status(200).json({
      status: "200",
      message: "Record Found",
      data,
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

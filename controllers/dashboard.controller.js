const { Op } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.CustomerStatus = async (req, res) => {
  try {
    const [customers, drivers, tripPlans, tripOperations, vehicleAvailables, invoices] = await Promise.all([
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
      DBMODELS.VehicleAvailable.findAll(),
      DBMODELS.InvoiceMaster.findAll(),
    ]);

    if (!customers || !drivers || !tripPlans || !tripOperations || !vehicleAvailables || !invoices) {
      throw new Error("Failed to retrieve necessary data");
    }

    let settlement_trip = 0;
    let pending_settlement = 0;

    for (const trip of tripPlans) {
      if (trip.Is_Settled === 1) settlement_trip++;
      else if (trip.Is_Settled === null) pending_settlement++;
    }

    let ongoing_travel = 0;
    for (const trip of tripPlans) {
      if (trip.Status === 4) ongoing_travel++;
    }

    let completed_travel = 0;
    for (const op of tripOperations) {
      if (op.Stat === 7) completed_travel++;
    }

    let available_vehicles = 0;
    for (const op of vehicleAvailables) {
      if (op.VStatus === 2) available_vehicles++;
    }

    const Total_invoices = invoices.length

    const data = {
      totalCustomer: customers.length,
      totalDriver: drivers.length,
      settlement_trip,
      pending_settlement,
      totalpanding_rate: 0,
      total_invoice: Total_invoices,
      active_vehicle: 0,
      broken_down_vehicle: 0,
      ongoing_travel,
      completed_travel,
      delayed_travel: 0,
      vehicle_availability: available_vehicles,
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

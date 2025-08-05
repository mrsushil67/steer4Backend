const { Op, where, col } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.CustomerStatus = async (req, res) => {
  try {
    const [
      customers,
      drivers,
      tripPlans,
      tripOperations,
      vehicleAvailables,
      invoices,
      settledTrips,
    ] = await Promise.all([
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
      DBMODELS.TripPlan.findAll({
        where: {
          [Op.and]: [{ Is_Completed: 1 }, { Is_Settled: { [Op.ne]: null } }],
        },
      }),
    ]);

    if (
      !customers ||
      !drivers ||
      !tripPlans ||
      !tripOperations ||
      !vehicleAvailables ||
      !invoices ||
      !settledTrips
    ) {
      throw new Error("Failed to retrieve necessary data");
    }

    let settlement_trip = settledTrips.length;
    let pending_settlement = tripPlans.length - settledTrips.length;

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

    const Total_invoices = invoices.length;

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

module.exports.DriverActivity = async (req, res) => {
  try {
    const allDrivers = await DBMODELS.Driver.findAll();
    const unblockedDrivers = allDrivers.filter(
      (driver) => driver.BlockStataus === 1
    );

    const tripPlans = await DBMODELS.TripPlan.findAll();

    const driverUsage = {};

    for (const trip of tripPlans) {
      if (trip.Driver1Id) {
        driverUsage[trip.Driver1Id] = (driverUsage[trip.Driver1Id] || 0) + 1;
      }
      if (trip.Driver2Id) {
        driverUsage[trip.Driver2Id] = (driverUsage[trip.Driver2Id] || 0) + 1;
      }
    }

    const driverUsageDetails = allDrivers.map((driver) => ({
      driverId: driver.DriverID,
      name: driver.DName,
      usedTimes: driverUsage[driver.DriverID] || 0,
      isBlocked: driver.BlockStataus === 2,
    }));

    const data = {
      totalDrivers: allDrivers.length,
      totalUnblockedDrivers: unblockedDrivers.length,
      driverUsage: driverUsageDetails,
    };

    return res.status(200).json({
      status: "200",
      message: "Driver Activity Reports",
      data,
    });
  } catch (error) {
    console.error("Error in Driver Activity:", {
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

module.exports.getTotalExpence = async (req, res) => {
  try {
    const tripPlans = await DBMODELS.TripPlan.findAll({
      where: { Status: { [Op.ne]: 6 } },
      include: [
        {
          model: DBMODELS.TripAdvance,
          as: "TripAdvances",
          attributes: ["Cash", "TotalAmt"],
        },
      ],
    });

    let totalCash = 0;
    let totalAmt = 0;

    tripPlans.forEach((trip) => {
      trip.TripAdvances.forEach((advance) => {
        totalCash += Number(advance.Cash || 0);
        totalAmt += Number(advance.TotalAmt || 0);
      });
    });

    const totalExpense = totalCash + totalAmt;

    return res.status(200).json({
      status: "200",
      message: "Total expense calculated successfully",
      totalCash,
      totalAmt,
      totalExpense,
    });
  } catch (error) {
    console.error("Error in Total Expence:", {
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

module.exports.TotalSales = async (req, res) => {
  try {
    const tripPlans = await DBMODELS.TripPlan.findAll({
      where: { Status: { [Op.ne]: 6 } },
      include: [
        {
          model: DBMODELS.CustRateMap,
          as: "CustRateMaps",
          required: false,
          on: {
            CustId: where(
              col("TripPlan.CustId"),
              "=",
              col("CustRateMaps.CustId")
            ),
            RouteId: where(
              col("TripPlan.RouteId"),
              "=",
              col("CustRateMaps.RouteId")
            ),
          },
          attributes: ["Rate"],
        },
      ],
    });

    let totalRate = 0;

    tripPlans.forEach((trip) => {
      const rateMap = trip.CustRateMaps;

      if (rateMap && typeof rateMap === "object" && rateMap.Rate != null) {
        totalRate += Number(rateMap.Rate);
      } else if (Array.isArray(rateMap)) {
        rateMap.forEach((r) => {
          if (r && r.Rate != null) {
            totalRate += Number(r.Rate);
          }
        });
      }
    });

    return res.status(200).json({
      status: "200",
      message: "Total sales calculated successfully",
      totalRate,
      data: tripPlans,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

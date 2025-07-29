const { DBMODELS } = require("../models/init-models");
const moment = require("moment");
const { Op, fn, col, literal, where, Sequelize } = require("sequelize");

module.exports.getDetailsforTripSettlement = async (req, res) => {
  try {
    const tripIds = (req.fields?.tripIds || req.body?.tripIds || []).map(Number);

    if (!Array.isArray(tripIds) || tripIds.length === 0) {
      return res.status(400).json({ error: "At least one trip ID is required." });
    }

    // Fetch vehicle numbers for all tripIds
    const vehicleNumbers = await DBMODELS.TripPlan.findAll({
      where: { ID: { [Op.in]: tripIds } },
      attributes: ["VehicleId"],
      raw: true,
    });

    const uniqueVehicleNumbers = [
      ...new Set(vehicleNumbers.map((item) => item.VehicleId)),
    ];

    if (uniqueVehicleNumbers.length > 1) {
      return res.status(400).json({
        message: "Vehicle numbers are not same in given trip IDs.",
        vehicleNumbers: uniqueVehicleNumbers,
      });
    }

    console.log("tripIds : ", tripIds);
    const tripPlans = await DBMODELS.TripPlan.findAll({
      attributes: [
        [
          fn("GROUP_CONCAT", literal('TripPlan.TripSheet SEPARATOR ","')),
          "Trip",
        ],
        [fn("GROUP_CONCAT", literal('TripPlan.ID SEPARATOR ","')), "TripId"],
        [col("Vehicle.VNumer"), "VNumer"],
        [col("Vehicle.FleetZize"), "FleetZize"],
        [col("Vehicle.VMaker"), "VehicleCompany"],
        [col("Vehicle.TyreQ"), "TyreQ"],
        [col("Driver.DName"), "FirstDriverName"],
        [col("Driver.Licence"), "FristDrverLicence"],
        [col("Driver.DName"), "SecoundDriverName"],
        [col("Driver.Licence"), "SecoundLicence"],
        [
          fn(
            "GROUP_CONCAT",
            literal('DISTINCT CustRateMaps.RouteString SEPARATOR ","')
          ),
          "RouteString",
        ],
        [col("CustRateMaps.Rate"), "Rate"],
        [
          fn(
            "GROUP_CONCAT",
            literal('DISTINCT CustomerMasters.CustomerName SEPARATOR ","')
          ),
          "Customer",
        ],
        [
          fn("GROUP_CONCAT", literal('DISTINCT TripPlan.CustId SEPARATOR ","')),
          "CustomerId",
        ],
        [col("route_master->source_city.CityName"), "SourceCity"],
        [col("route_master->dest_city.CityName"), "DestCity"],
      ],
      include: [
        {
          model: DBMODELS.Vehicle,
          as: "Vehicle",
          attributes: [],
        },
        {
          model: DBMODELS.Driver,
          as: "Driver",
          attributes: [],
        },
        {
          model: DBMODELS.CustomerMaster,
          as: "CustomerMasters",
          attributes: [],
        },
        {
          model: DBMODELS.RouteMaster,
          as: "route_master",
          attributes: [],
          include: [
            {
              model: DBMODELS.city,
              as: "source_city",
              attributes: [],
            },
            {
              model: DBMODELS.city,
              as: "dest_city",
              attributes: [],
            },
          ],
        },
        {
          model: DBMODELS.CustRateMap,
          as: "CustRateMaps",
          include: [
            { model: DBMODELS.TripType, as: "trip_type", required: true },
          ],
        },
      ],
      group: [
        "Vehicle.VNumer",
        "Vehicle.FleetZize",
        "Vehicle.VMaker",
        "Vehicle.TyreQ",
        "Driver.DName",
        "Driver.Licence",
        "CustRateMaps.Rate",
        "CustomerMasters.CustomerName",
        "TripPlan.CustId",
        "route_master->source_city.CityName",
        "route_master->dest_city.CityName",
      ],
      where: {
        [Op.and]: [{ ID: { [Op.in]: tripIds } }, { Is_Completed: 1 }],
      },
      raw: true,
    });

    console.log("tripPlans : ", tripPlans);

    let routeStrings = [];
    if (tripIds.length > 1) {
      const routeRows = await DBMODELS.TripPlan.findAll({
        where: { ID: { [Op.in]: tripIds } },
        include: [
          {
            model: DBMODELS.CustRateMap,
            as: "CustRateMaps",
            attributes: ["RouteString"],
          },
        ],
        attributes: [],
        raw: true,
      });
      routeStrings = routeRows.map(r => r["CustRateMaps.RouteString"]).filter(Boolean);
    }

    console.log("routeStrings : ",routeStrings)
    // Merge routeStrings into one value if multiple trips exist
    const tripPlanData = tripPlans[0] || {};
    if (routeStrings.length) {
      tripPlanData.RouteString = routeStrings.join(",");
    }

    console.log("tripPlanData : ",tripPlanData)
    // Fetch trip advance and onroute details
    const tripAdvance = await DBMODELS.TripAdvance.findAll({
      where: {
        TripId: { [Op.in]: tripIds },
        PaidBy: 1,
      },
      include: [
        { model: DBMODELS.TripPlan, as: "TripPlan", attributes: [] },
        { model: DBMODELS.PumpDetails, as: "PumpDetails", attributes: [] },
      ],
      raw: true,
    });

    console.log("tripAdvance : ",tripAdvance);

    const tripOnroute = await DBMODELS.TripAdvance.findAll({
      where: {
        TripId: { [Op.in]: tripIds },
        PaidBy: 2,
      },
      include: [
        { model: DBMODELS.TripPlan, as: "TripPlan", attributes: [] },
        { model: DBMODELS.PumpDetails, as: "PumpDetails", attributes: [] },
      ],
      raw: true,
    });

       console.log("tripOnroute : ",tripOnroute);

    const round = (n) => parseFloat(Number(n).toFixed(2));
    const TotalAdvanceCash = round(
      tripAdvance.reduce((sum, item) => sum + (parseFloat(item.Cash) || 0), 0)
    );
    const TotalAdvanceDiesel = round(
      tripAdvance.reduce(
        (sum, item) => sum + (parseFloat(item.DieselQty) || 0),
        0
      )
    );
    const TotalOnrouteCash = round(
      tripOnroute.reduce((sum, item) => sum + (parseFloat(item.Cash) || 0), 0)
    );
    const TotalOnrouteDiesel = round(
      tripOnroute.reduce(
        (sum, item) => sum + (parseFloat(item.DieselQty) || 0),
        0
      )
    );

    const totalExpence = {
      TotalTipCash: round(TotalAdvanceCash + TotalOnrouteCash),
      TotalTripDiesel: round(TotalAdvanceDiesel + TotalOnrouteDiesel),
    };

    // Fetch trip operations for all IDs
    const tripOperations = await DBMODELS.TripOperation.findAll({
      where: { TripId: { [Op.in]: tripIds } },
      attributes: ["TripId", "TripNo", "ATD", "ATA"],
      raw: true,
    });

    console.log("tripOperations : ",tripOperations)
    // Get ATD and ATA for first and last trips
    const formatDate = (date) =>
      date ? moment(date).format("YYYY-MM-DD HH:mm:ss") : null;

    // Sort tripIds to get first and last
    const sortedTripIds = [...tripIds].sort((a, b) => a - b);

    // Find first trip's ATD (TripNo ends with 'A')
    const firstTripId = sortedTripIds[0];
    const firstTripOpA = tripOperations.find(
      (op) => op.TripId === firstTripId && op.TripNo?.trim().endsWith("A")
    );
    const ATD = firstTripOpA ? formatDate(firstTripOpA.ATD) : null;

    // Find last trip's ATA (TripNo ends with 'B')
    const lastTripId = sortedTripIds[sortedTripIds.length - 1];
    const lastTripOpB = tripOperations.find(
      (op) => op.TripId === lastTripId && op.TripNo?.trim().endsWith("B")
    );
    const ATA = lastTripOpB ? formatDate(lastTripOpB.ATA) : null;

    // Compose response object
    const response = {
      tripPlan: {
        ...tripPlanData,
        TripIds: tripIds.join(","),
        ATD,
        ATA,
        TotalAdvanceCash,
        TotalAdvanceDiesel,
        TotalOnrouteCash,
        TotalOnrouteDiesel,
      },
      tripAdvanceList: tripAdvance,
      tripOnrouteList: tripOnroute,
      totalExpence,
    };

    if (!tripAdvance.length && !tripOnroute.length) {
      return res.status(404).json({
        status: "404",
        message: "No trip settlement found for the given trip IDs.",
      });
    }

    return res.status(200).json({
      status: "200",
      message: "Records Found",
      tripSettlement: response,
    });
  } catch (error) {
    console.error("Error fetching details for trip settlement:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports.createTripSettlement = async (req, res) => {
  try {
    const {
      StartKms,
      CloseKms,
      TotalRun,
      Mileage,
      ExcDiesel,
      Maintanance_die,
      BalanceDiesl,
      TAdvanceCash,
      TAdvncDiesl,
      TOnRTCash,
      TOnRTDiesel,
      HandlingChrgs,
      OtherChargs,
      BalanceCash,
      date,
      FastTagNew,
      TCash,
      HChargs,
      OtherChargsGvnBy,
      TDiesel,
      DieselRT,
      Remark,
      MechCharge,
      CustName,
      DeptDate,
      ATA,
      dalaCharge,
      DalaChargeRemark,
      TotalAmtPaid,
      Kanta,
      Challan,
      ChallanRemark,
      Pollution,
    } = req.body;

    console.log("Body : ", req.body);

    if (!StartKms || !CloseKms || !ExcDiesel || !BalanceCash) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    if (!TCash || !TDiesel) {
      return res
        .status(400)
        .json({ error: "missing TCash or TDiesel required." });
    }

    const formattedDate = date
      ? moment(date, "YYYY-MM-DD").format("YYYY-MM-DD")
      : new Date();
    const formattedDeptDate = DeptDate
      ? moment(DeptDate, "YYYY-MM-DD").format("YYYY-MM-DD")
      : new Date();

    const data = {
      StartKms,
      CloseKms,
      TotalRun,
      Mileage,
      ExcDiesel,
      Maintanance_die,
      BalanceDiesl,
      TAdvanceCash,
      TAdvncDiesl,
      TOnRTCash,
      TOnRTDiesel,
      HandlingChrgs,
      OtherChargs,
      BalanceCash,
      Date: formattedDate,
      FastTagNew,
      TCash,
      HChargs,
      TDiesel,
      DieselRT,
      Remark,
      MechCharge,
      CustName,
      DeptDate: formattedDeptDate,
      ATA,
      dalaCharge,
      DalaChargeRemark,
      TotalAmtPaid,
      Kanta,
      Challan,
      ChallanRemark,
      Pollution,
      CreatedDate: new Date(),
    };

    const tripSettlement = await DBMODELS.TripSettlement.create(data);

    return res.status(201).json({
      status: "201",
      message: "Trip settlement created successfully",
    });
  } catch (error) {
    console.error("Error creating trip settlement:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports.getTripSettlement = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Trip ID is required." });
    }
    const tripSettlement = await DBMODELS.TripSettlement.findOne({
      where: { ID: id },
    });
    if (!tripSettlement) {
      return res.status(404).json({ error: "Trip settlement not found." });
    }
    return res.status(200).json({
      status: "200",
      message: "Record Found",
      tripSettlement,
    });
  } catch (error) {
    console.error("Error fetching trip settlement:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports.getPandingSettlementrips = async (req, res) => {
  try {
    const { tripsheetNo = null } = req.body || {};

    const tripPlanWhere = {
      Is_Completed: 1,
      Is_Settled: { [Op.eq]: null },
    };

    if (tripsheetNo) {
      tripPlanWhere.TripSheet = { [Op.like]: `%${tripsheetNo}%` };
    }

    const latestTripOps = await DBMODELS.TripOperation.findAll({
      attributes: ["TripId", [fn("MAX", col("Id")), "MaxId"]],
      group: ["TripId"],
      raw: true,
    });

    if (!latestTripOps || latestTripOps.length === 0) {
      return res
        .status(404)
        .json({ status: "404", message: "No trip operations found." });
    }

    const ids = latestTripOps.map((item) => item.MaxId);

    const completedTrips = await DBMODELS.TripOperation.findAll({
      where: { Id: ids },
      include: {
        model: DBMODELS.TripPlan,
        as: "TripPlan",
        where: tripPlanWhere,
      },
    });

    if (!completedTrips || completedTrips.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No completed trips found for the provided criteria.",
      });
    }

    return res
      .status(200)
      .json({ status: "200", message: "Record Found", data: completedTrips });
  } catch (error) {
    console.error("Error in pending settlement:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

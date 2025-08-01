const { DBMODELS } = require("../models/init-models");
const moment = require("moment");
const { Op, fn, col, literal, where, Sequelize } = require("sequelize");

module.exports.getDetailsforTripSettlement = async (req, res) => {
  try {
    const tripIds = (req.fields?.tripIds || req.body?.tripIds || []).map(
      Number
    );

    if (!Array.isArray(tripIds) || tripIds.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one trip ID is required." });
    }

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

    const tripPlans = await DBMODELS.TripPlan.findAll({
      attributes: [
        "ID",
        "TripSheet",
        "TripType",
        [col("Vehicle.VNumer"), "VNumer"],
        [col("Vehicle.FleetZize"), "FleetZize"],
        [col("Vehicle.VMaker"), "VehicleCompany"],
        [col("Vehicle.TyreQ"), "TyreQ"],
        [col("Driver.DName"), "FirstDriverName"],
        [col("Driver.Licence"), "FristDrverLicence"],
        [col("Driver.DName"), "SecoundDriverName"],
        [col("Driver.Licence"), "SecoundLicence"],
        [col("CustRateMaps.RouteString"), "RouteString"],
        [col("CustRateMaps.Rate"), "Rate"],
        [col("CustomerMasters.CustomerName"), "Customer"],
        [col("route_master->source_city.CityName"), "SourceCity"],
        [col("route_master->dest_city.CityName"), "DestCity"],
        [col("CustRateMaps.CustId"), "CustRateMapId"],
        [col("CustomerMasters.CustId"), "CustomerId"],
        [col("MarketCust.Name"), "MarketCustName"],
        [col("MarketCust.City"), "MarketCustCity"],
        [col("MarketCust.ID"), "MarketCustomerId"],
      ],
      include: [
        { model: DBMODELS.Vehicle, as: "Vehicle", attributes: [] },
        { model: DBMODELS.Driver, as: "Driver", attributes: [] },
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
            { model: DBMODELS.city, as: "source_city", attributes: [] },
            { model: DBMODELS.city, as: "dest_city", attributes: [] },
          ],
        },
        {
          model: DBMODELS.CustRateMap,
          as: "CustRateMaps",
          include: [
            { model: DBMODELS.TripType, as: "trip_type", required: true },
          ],
          attributes: [],
        },
        {
          model: DBMODELS.MarketCust,
          as: "MarketCust",
          attributes: [],
        },
      ],
      where: {
        [Op.and]: [{ ID: { [Op.in]: tripIds } }, { Is_Completed: 1 }],
      },
      raw: true,
    });

    // Build RouteString as per requirement
    const routeStrings = tripPlans.map((tp) => {
      const source = tp.SourceCity || "";
      const dest = tp.DestCity || "";
      if (tp.TripType === 2) {
        // Source-Dest-Source
        return `${source}-${dest}-${source}`;
      } else {
        // Source-Dest
        return `${source}-${dest}`;
      }
    });

    const mergedTripPlan = {};
    mergedTripPlan.ID = tripPlans.map((tp) => tp.ID).join(",");
    mergedTripPlan.TripSheet = tripPlans.map((tp) => tp.TripSheet).join(",");
    mergedTripPlan.RouteString = routeStrings.join(" ");
    // mergedTripPlan.SourceCities = routeStrings.join(" ");
    // mergedTripPlan.DestCities = routeStrings.join(" ");

    const firstTripPlan = tripPlans[0] || {};
    [
      "VNumer",
      "FleetZize",
      "VehicleCompany",
      "TyreQ",
      "FirstDriverName",
      "FristDrverLicence",
      "SecoundDriverName",
      "SecoundLicence",
      "Rate",
      "Customer",
      "CustRateMapId",
      "CustomerId",
      "MarketCustName",
      "MarketCustCity",
      "MarketCustomerId",
    ].forEach((field) => {
      mergedTripPlan[field] = firstTripPlan[field] || "";
    });

    const tripAdvance = await DBMODELS.TripAdvance.findAll({
      where: { TripId: { [Op.in]: tripIds }, PaidBy: 1 },
      include: [
        { model: DBMODELS.TripPlan, as: "TripPlan", attributes: ["TripSheet"] },
        {
          model: DBMODELS.PumpDetails,
          as: "PumpDetails",
          attributes: ["PumpName"],
        },
      ],
      raw: true,
    });

    const tripOnroute = await DBMODELS.TripAdvance.findAll({
      where: { TripId: { [Op.in]: tripIds }, PaidBy: 2 },
      include: [
        { model: DBMODELS.TripPlan, as: "TripPlan", attributes: ["TripSheet"] },
        {
          model: DBMODELS.PumpDetails,
          as: "PumpDetails",
          attributes: ["PumpName"],
        },
      ],
      raw: true,
    });

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

    const tripOperations = await DBMODELS.TripOperation.findAll({
      where: { TripId: { [Op.in]: tripIds } },
      attributes: ["TripId", "TripNo", "ATD", "ATA"],
      raw: true,
    });

    const formatDate = (date) =>
      date ? moment(date).format("YYYY-MM-DD HH:mm:ss") : null;
    const sortedTripIds = [...tripIds].sort((a, b) => a - b);

    const firstTripId = sortedTripIds[0];
    const firstTripOpA = tripOperations.find(
      (op) => op.TripId === firstTripId && op.TripNo?.trim().endsWith("A")
    );
    const ATD = firstTripOpA ? formatDate(firstTripOpA.ATD) : null;

    const lastTripId = sortedTripIds[sortedTripIds.length - 1];
    let lastTripOpB = tripOperations.find(
      (op) =>
        op.TripId === lastTripId &&
        op.TripNo &&
        op.TripNo.trim().toUpperCase().endsWith("B")
    );
    if (!lastTripOpB) {
      lastTripOpB = tripOperations.find(
        (op) => op.TripId === lastTripId && op.ATA
      );
    }
    const ATA =
      lastTripOpB && lastTripOpB.ATA ? formatDate(lastTripOpB.ATA) : null;

    const response = {
      tripPlan: {
        ...mergedTripPlan,
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

    if (!tripPlans.length) {
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
      tripIds,
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
      DebitCredit,
      date,
      FastTagNew,
      TCash,
      HChargs,
      OtherChargsGvnBy,
      TDiesel,
      DieselRT,
      Remark,
      CashReturn,
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

    if (!tripIds || !Array.isArray(tripIds) || tripIds.length === 0) {
      return res.status(400).json({ error: "tripIds array is required." });
    }

    if (!StartKms || !CloseKms) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    if (!TCash || !TDiesel ||!DebitCredit) {
      return res
        .status(400)
        .json({ error: "missing TCash or TDiesel or DebitCredit required." });
    }

    // Helper to check for invalid date values (with time)
    const getValidDateTime = (d) => {
      if (d === undefined || d === null || d === "" || d === 0) {
        return moment().format("YYYY-MM-DD HH:mm:ss");
      }
      return moment(d).isValid()
        ? moment(d).format("YYYY-MM-DD HH:mm:ss")
        : moment().format("YYYY-MM-DD HH:mm:ss");
    };

    const formattedDate = getValidDateTime(date);
    const formattedDeptDate = getValidDateTime(DeptDate);
    const formatedATA = getValidDateTime(ATA);

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
      BalanceCash:DebitCredit,
      Date: formattedDate,
      FastTagNew,
      TCash,
      HChargs,
      TDiesel,
      DieselRT,
      Remark,
      CashReturn,
      MechCharge,
      CustName,
      DeptDate: formattedDeptDate,
      ATA: formatedATA,
      dalaCharge,
      DalaChargeRemark,
      TotalAmtPaid,
      Kanta,
      Challan,
      ChallanRemark,
      Pollution,
      CreatedDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    const tripSettlement = await DBMODELS.TripSettlement.create(data);

    const alreadySettledTrips = await DBMODELS.TripPlan.findAll({
      where: {
        ID: { [Op.in]: tripIds },
        Is_Settled: { [Op.not]: null },
      },
      attributes: ["ID", "Is_Settled"],
      raw: true,
    });

    if (alreadySettledTrips.length > 0) {
      return res.status(400).json({
        error: "One or more trips are already settled.",
        settledTrips: alreadySettledTrips.map((t) => t.ID),
      });
    }

    // Update Is_Settled for trips that are not settled
    await DBMODELS.TripPlan.update(
      { Is_Settled: tripSettlement.ID },
      { where: { ID: { [Op.in]: tripIds }, Is_Settled: { [Op.is]: null } } }
    );

    return res.status(201).json({
      status: "201",
      message: "Trip settlement created and trips updated successfully",
      tripSettlementId: tripSettlement.ID,
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
      return res.status(400).json({ error: "Trip settlement ID is required." });
    }

    const tripSettlement = await DBMODELS.TripSettlement.findOne({
      where: { ID: id },
      raw: true,
    });

    if (!tripSettlement) {
      return res.status(404).json({ error: "Trip settlement not found." });
    }

    const relatedTrips = await DBMODELS.TripPlan.findAll({
      where: { Is_Settled: id },
      include: [
        { model: DBMODELS.Vehicle, as: "Vehicle", attributes: ["VehicleID", "VNumer", "FleetZize", "VMaker", "TyreQ"] },
        { model: DBMODELS.Driver, as: "Driver", attributes: ["DriverID", "DName", "Licence"] },
        {
          model: DBMODELS.CustomerMaster,
          as: "CustomerMasters",
          attributes: ["CustId", "CustomerName", "CustCode", "GSTNo"],
        },
        {
          model: DBMODELS.RouteMaster,
          as: "route_master",
          include: [
            { model: DBMODELS.city, as: "source_city", attributes: ["CityName"] },
            { model: DBMODELS.city, as: "dest_city", attributes: ["CityName"] },
          ],
        },
        {
          model: DBMODELS.CustRateMap,
          as: "CustRateMaps",
          include: [
            { model: DBMODELS.TripType, as: "trip_type", required: true, attributes: ["Id", "TypeName"] },
          ],
          attributes: ["ID", "CustId", "RouteId", "RouteType", "TripType", "RouteString"],
        },
        {
          model: DBMODELS.MarketCust,
          as: "MarketCust",
          attributes: ["ID", "Name", "City"],
        },
      ],
      raw: false,
    });

    let mergedTrip = {};
    if (relatedTrips.length > 0) {
      mergedTrip.ID = relatedTrips.map(trip => trip.ID).join(",");
      mergedTrip.TripSheet = relatedTrips.map(trip => trip.TripSheet).join(",");
      mergedTrip.RouteString = relatedTrips.map(trip => {
        const source = trip.route_master?.source_city?.CityName || "";
        const dest = trip.route_master?.dest_city?.CityName || "";
        const tripType = trip.TripType;
        if (parseInt(tripType) === 2) {
          return `${source}-${dest}-${source}`;
        } else {
          return `${source}-${dest}`;
        }
      }).join(" ");

      // Take single value fields from the first trip
      const firstTrip = relatedTrips[0];
      [
        "VNumer",
        "FleetZize",
        "VehicleCompany",
        "TyreQ",
        "FirstDriverName",
        "FristDrverLicence",
        "SecoundDriverName",
        "SecoundLicence",
        "Rate",
        "Customer",
        "CustRateMapId",
        "CustomerId",
        "MarketCustName",
        "MarketCustCity",
        "MarketCustomerId"
      ].forEach(field => {
        // Try to get from nested models if needed
        switch (field) {
          case "VNumer":
            mergedTrip.VNumer = firstTrip.Vehicle?.VNumer || "";
            break;
          case "FleetZize":
            mergedTrip.FleetZize = firstTrip.Vehicle?.FleetZize || "";
            break;
          case "VehicleCompany":
            mergedTrip.VehicleCompany = firstTrip.Vehicle?.VMaker || "";
            break;
          case "TyreQ":
            mergedTrip.TyreQ = firstTrip.Vehicle?.TyreQ || "";
            break;
          case "FirstDriverName":
            mergedTrip.FirstDriverName = firstTrip.Driver?.DName || "";
            break;
          case "FristDrverLicence":
            mergedTrip.FristDrverLicence = firstTrip.Driver?.Licence || "";
            break;
          case "SecoundDriverName":
            mergedTrip.SecoundDriverName = firstTrip.Driver?.DName || "";
            break;
          case "SecoundLicence":
            mergedTrip.SecoundLicence = firstTrip.Driver?.Licence || "";
            break;
          case "Rate":
            mergedTrip.Rate = firstTrip.CustRateMaps?.Rate || "";
            break;
          case "Customer":
            mergedTrip.Customer = firstTrip.CustomerMasters?.CustomerName || "";
            break;
          case "CustRateMapId":
            mergedTrip.CustRateMapId = firstTrip.CustRateMaps?.ID || "";
            break;
          case "CustomerId":
            mergedTrip.CustomerId = firstTrip.CustomerMasters?.CustId || "";
            break;
          case "MarketCustName":
            mergedTrip.MarketCustName = firstTrip.MarketCust?.Name || "";
            break;
          case "MarketCustCity":
            mergedTrip.MarketCustCity = firstTrip.MarketCust?.City || "";
            break;
          case "MarketCustomerId":
            mergedTrip.MarketCustomerId = firstTrip.MarketCust?.ID || "";
            break;
          default:
            mergedTrip[field] = firstTrip[field] || "";
        }
      });
    }

    const tripIds = relatedTrips.map(trip => trip.ID);

    // Fetch TripAdvance and OnRoute data separately
    const tripAdvance = await DBMODELS.TripAdvance.findAll({
      where: { TripId: { [Op.in]: tripIds }, PaidBy: 1 },
      include: [
        { model: DBMODELS.TripPlan, as: "TripPlan", attributes: ["TripSheet"] },
        { model: DBMODELS.PumpDetails, as: "PumpDetails", attributes: ["PumpName"] },
      ],
      raw: true,
    });

    const tripOnroute = await DBMODELS.TripAdvance.findAll({
      where: { TripId: { [Op.in]: tripIds }, PaidBy: 2 },
      include: [
        { model: DBMODELS.TripPlan, as: "TripPlan", attributes: ["TripSheet"] },
        {
          model: DBMODELS.PumpDetails,
          as: "PumpDetails",
          attributes: ["PumpName"],
        },
      ],
      raw: true,
    });

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

    const tripOperations = await DBMODELS.TripOperation.findAll({
      where: { TripId: { [Op.in]: tripIds } },
      attributes: ["TripId", "TripNo", "ATD", "ATA"],
      raw: true,
    });

    const formatDate = (date) =>
      date ? moment(date).format("YYYY-MM-DD HH:mm:ss") : null;
    const sortedTripIds = [...tripIds].sort((a, b) => a - b);

    const firstTripId = sortedTripIds[0];
    const firstTripOpA = tripOperations.find(
      (op) => op.TripId === firstTripId && op.TripNo?.trim().endsWith("A")
    );
    const ATD = firstTripOpA ? formatDate(firstTripOpA.ATD) : null;

    const lastTripId = sortedTripIds[sortedTripIds.length - 1];
    let lastTripOpB = tripOperations.find(
      (op) =>
        op.TripId === lastTripId &&
        op.TripNo &&
        op.TripNo.trim().toUpperCase().endsWith("B")
    );
    if (!lastTripOpB) {
      lastTripOpB = tripOperations.find(
        (op) => op.TripId === lastTripId && op.ATA
      );
    }
    const ATA =
      lastTripOpB && lastTripOpB.ATA ? formatDate(lastTripOpB.ATA) : null;

    const response = {
      tripSettlement,
      tripPlan: {
        ...mergedTrip,
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

    return res.status(200).json({
      status: "200",
      message: "Record Found",
      response
    });
  } catch (error) {
    console.error("Error fetching trip settlement:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports.getPandingSettlementrips = async (req, res) => {
  try {
    const { tripsheetNo = null } = req.body || {};

    const tripPlanWhere = {};

    if (tripsheetNo) {
      tripPlanWhere[Op.or] = [
        { "$TripPlan.TripSheet$": { [Op.like]: `%${tripsheetNo}%` } },
        { "$TripPlan.Vehicle.VNumer$": { [Op.like]: `%${tripsheetNo}%` } },
      ];
    }

    const completedTrips = await DBMODELS.TripOperation.findAll({
      where: tripPlanWhere,
      include: [
        {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          where: {
            Is_Completed: 1,
            Is_Settled: { [Op.eq]: null },
          },
          include: [
            {
              model: DBMODELS.CustomerMaster,
              as: "CustomerMasters",
              attributes: ["CustId", "CustomerName", "CustCode", "GSTNo"],
            },
            {
              model: DBMODELS.MarketCust,
              as: "MarketCust",
            },
            {
              model: DBMODELS.Vehicle,
              as: "Vehicle",
              attributes: ["VehicleID", "VNumer", "FleetZize"],
            },
            {
              model: DBMODELS.Driver,
              as: "Driver",
              attributes: ["DriverID", "DName", "Licence"],
            },
            {
              model: DBMODELS.RouteMaster,
              as: "route_master",
              attributes: ["RouteId"],
              include: [
                {
                  model: DBMODELS.city,
                  as: "source_city",
                  attributes: ["CityName", "latitude", "longitude"],
                },
                {
                  model: DBMODELS.city,
                  as: "dest_city",
                  attributes: ["CityName", "latitude", "longitude"],
                },
              ],
            },
            {
              model: DBMODELS.CustRateMap,
              as: "CustRateMaps",
              on: literal(
                "`TripPlan`.`RouteId` = `TripPlan->CustRateMaps`.`RouteId` AND `TripPlan`.`CustId` = `TripPlan->CustRateMaps`.`CustId` AND `TripPlan`.`TripType` = `TripPlan->CustRateMaps`.`TripType`"
              ),
              include: [
                {
                  model: DBMODELS.TripType,
                  as: "trip_type",
                  required: true,
                  attributes: ["Id", "TypeName"],
                },
              ],
              attributes: [
                "ID",
                "CustId",
                "RouteId",
                "RouteType",
                "TripType",
                "RouteString",
              ],
            },
          ],
        },
      ],
    });

    const uniqueTrips = [];
    const seenTripIds = new Set();

    for (const trip of completedTrips) {
      if (!seenTripIds.has(trip.TripId)) {
        seenTripIds.add(trip.TripId);
        uniqueTrips.push(trip);
      }
    }

    return res.status(200).json({
      status: "200",
      message: "Record Found",
      data: uniqueTrips,
    });
  } catch (error) {
    console.error("Error in pending settlement:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports.getDriverDebit = async (req, res) => {
  try {
    const { settlementId } = req.body;
    if (!settlementId) {
      return res.status(400).json({ error: "settlementId is required." });
    }

    const settlementTrip = await DBMODELS.TripSettlement.findOne({
      where: { ID: settlementId },
      attributes: [
        "TAdvanceCash",
        "TAdvncDiesl",
        "TOnRTCash",
        "TOnRTDiesel",
        "TCash",
        "TDiesel",
      ],
      raw: true,
    });

    if (!settlementTrip) {
      return res.status(404).json({ error: "Trip settlement not found." });
    }

    const relatedTrips = await DBMODELS.TripPlan.findAll({
      where: { Is_Settled: settlementId },
      include: [
        {
          model: DBMODELS.Driver,
          as: "Driver",
          attributes: ["DriverID", "DName", "Licence"],
        },
        {
          model: DBMODELS.Vehicle,
          as: "Vehicle",
          attributes: ["VehicleID", "VNumer", "FleetZize", "VMaker", "TyreQ"],
        },
      ],
      attributes: ["ID", "TripSheet", "Driver1Id", "Driver2Id", "VehicleId"],
      raw: true,
    });

    const driverIds = [];
    relatedTrips.forEach((trip) => {
      if (trip.Driver1Id) driverIds.push(trip.Driver1Id);
      if (trip.Driver2Id) driverIds.push(trip.Driver2Id);
    });
    const uniqueDriverIds = [...new Set(driverIds)];

    const vehicleInfo =
      relatedTrips.length > 0
        ? {
            VehicleID: relatedTrips[0]["Vehicle.VehicleID"] || "",
            VNumer: relatedTrips[0]["Vehicle.VNumer"] || "",
            FleetZize: relatedTrips[0]["Vehicle.FleetZize"] || "",
            VMaker: relatedTrips[0]["Vehicle.VMaker"] || "",
            TyreQ: relatedTrips[0]["Vehicle.TyreQ"] || "",
          }
        : {};

    const driverAdvances = await DBMODELS.TripAdvance.findAll({
      where: {
        TripId: { [Op.in]: relatedTrips.map((trip) => trip.ID) },
        PaidBy: 1,
      },
      attributes: ["TripId", "Cash", "DieselQty", "PaidBy"],
      raw: true,
    });

    const driverDetails = uniqueDriverIds.map((driverId) => {
      const tripInfo = relatedTrips.find(
        (trip) => trip.Driver1Id === driverId || trip.Driver2Id === driverId
      );
      const advances = driverAdvances.filter((adv) =>
        relatedTrips.find(
          (trip) =>
            trip.ID === adv.TripId &&
            (trip.Driver1Id === driverId || trip.Driver2Id === driverId)
        )
      );
      const totalCash = advances.reduce(
        (sum, adv) => sum + (parseFloat(adv.Cash) || 0),
        0
      );
      const totalDiesel = advances.reduce(
        (sum, adv) => sum + (parseFloat(adv.DieselQty) || 0),
        0
      );
      return {
        DriverId: driverId,
        DriverName: tripInfo?.["Driver.DName"] || "",
        Licence: tripInfo?.["Driver.Licence"] || "",
        TotalAdvanceCash: totalCash,
        TotalAdvanceDiesel: totalDiesel,
        // Vehicle: vehicleInfo,
      };
    });

    const data = {
      // settlement: settlementTrip,
      drivers: driverDetails,
      vehicle: vehicleInfo,
    };

    return res.status(200).json({
      status: "200",
      message: "Driver debit details found",
      data,
    });
  } catch (error) {
    console.error("Error in Get Driver Debit:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports.createDriverDebit = async (req, res) => {
  try {
    const {
      driverId,
      settledId,
      CashDebit,
      dieselQtyDB,
      DieselAmtDB,
      VehicleId,
      settledDate,
      Remark,
      total,
      DieselRate,
    } = req.body;

    if (!driverId || !settledId || !VehicleId) {
      return res
        .status(400)
        .json({ error: "driverId, settledId, and VehicleId are required." });
    }

    const formatedDate = settledDate
      ? moment(settledDate).format("YYYY-MM-DD HH:mm:ss")
      : moment().format("YYYY-MM-DD HH:mm:ss");

    const data = {
      DriverId: driverId,
      SettleId: settledId,
      CashDebit: CashDebit,
      DieselQtyDB: dieselQtyDB,
      DieselAmtDB: DieselAmtDB,
      VehcileId: VehicleId,
      Settledate: formatedDate,
      Remarks: Remark,
      Total: total,
      category: "drivers",
      DieselRate,
    };

    const existingDebit = await DBMODELS.DriverDebits.findOne({
      where: { SettleId: settledId },
    });

    if (existingDebit) {
      await DBMODELS.DriverDebits.update(data, {
        where: { SettleId: settledId },
      });
      return res
        .status(200)
        .json({ status: "200", message: "Driver debit updated successfully." });
    } else {
      await DBMODELS.DriverDebits.create(data);
      return res
        .status(201)
        .json({ status: "201", message: "Driver debit created successfully." });
    }
  } catch (error) {
    console.error("Error in Create Driver Debit:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports.getSettledTrips = async (req, res) => {
  try {
    const { tripsheetNo = null } = req.body || {};

    const tripPlanWhere = {};

    if (tripsheetNo) {
      tripPlanWhere[Op.or] = [
        { "$TripPlan.TripSheet$": { [Op.like]: `%${tripsheetNo}%` } },
        { "$TripPlan.Vehicle.VNumer$": { [Op.like]: `%${tripsheetNo}%` } },
      ];
    }

    const completedTrips = await DBMODELS.TripOperation.findAll({
      where: tripPlanWhere,
      include: [
        {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          where: {
            Is_Completed: 1,
            Is_Settled: { [Op.ne]: null },
          },
          include: [
            {
              model: DBMODELS.CustomerMaster,
              as: "CustomerMasters",
              attributes: ["CustId", "CustomerName", "CustCode", "GSTNo"],
            },
            {
              model: DBMODELS.MarketCust,
              as: "MarketCust",
            },
            {
              model: DBMODELS.Vehicle,
              as: "Vehicle",
              attributes: ["VehicleID", "VNumer", "FleetZize"],
            },
            {
              model: DBMODELS.Driver,
              as: "Driver",
              attributes: ["DriverID", "DName", "Licence"],
            },
            {
              model: DBMODELS.RouteMaster,
              as: "route_master",
              attributes: ["RouteId"],
              include: [
                {
                  model: DBMODELS.city,
                  as: "source_city",
                  attributes: ["CityName", "latitude", "longitude"],
                },
                {
                  model: DBMODELS.city,
                  as: "dest_city",
                  attributes: ["CityName", "latitude", "longitude"],
                },
              ],
            },
            {
              model: DBMODELS.CustRateMap,
              as: "CustRateMaps",
              on: literal(
                "`TripPlan`.`RouteId` = `TripPlan->CustRateMaps`.`RouteId` AND `TripPlan`.`CustId` = `TripPlan->CustRateMaps`.`CustId` AND `TripPlan`.`TripType` = `TripPlan->CustRateMaps`.`TripType`"
              ),
              include: [
                {
                  model: DBMODELS.TripType,
                  as: "trip_type",
                  required: true,
                  attributes: ["Id", "TypeName"],
                },
              ],
              attributes: [
                "ID",
                "CustId",
                "RouteId",
                "RouteType",
                "TripType",
                "RouteString",
              ],
            },
          ],
        },
      ],
    });

    const uniqueTrips = [];
    const seenTripIds = new Set();

    for (const trip of completedTrips) {
      if (!seenTripIds.has(trip.TripId)) {
        seenTripIds.add(trip.TripId);
        uniqueTrips.push(trip);
      }
    }

    return res.status(200).json({
      status: "200",
      message: "Record Found",
      data: uniqueTrips,
    });
  } catch (error) {
    console.error("Error in Create Driver Debit:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports.UpdateTripSettlement = async (req, res) => {
  try {
    const {
      settlementId,
      tripIds,
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

    console.log("Update body : ",req.body);

    if (!settlementId) {
      return res.status(400).json({ error: "TripSettlement settlementId is required for update." });
    }

    if (!tripIds || !Array.isArray(tripIds) || tripIds.length === 0) {
      return res.status(400).json({ error: "tripIds array is required." });
    }

    if (!StartKms || !CloseKms) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    if (!TCash || !TDiesel) {
      return res.status(400).json({ error: "Missing TCash or TDiesel." });
    }

    const getValidDateTime = (d) => {
      if (!d || d === 0) {
        return moment().format("YYYY-MM-DD HH:mm:ss");
      }
      return moment(d).isValid()
        ? moment(d).format("YYYY-MM-DD HH:mm:ss")
        : moment().format("YYYY-MM-DD HH:mm:ss");
    };

    const formattedDate = getValidDateTime(date);
    const formattedDeptDate = getValidDateTime(DeptDate);
    const formattedATA = getValidDateTime(ATA);

    const updatedData = {
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
      OtherChargsGvnBy,
      TDiesel,
      DieselRT,
      Remark,
      MechCharge,
      CustName,
      DeptDate: formattedDeptDate,
      ATA: formattedATA,
      dalaCharge,
      DalaChargeRemark,
      TotalAmtPaid,
      Kanta,
      Challan,
      ChallanRemark,
      Pollution,
      UpdatedDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    const existingSettlement = await DBMODELS.TripSettlement.findByPk(settlementId);

    if (!existingSettlement) {
      return res.status(404).json({ error: "TripSettlement not found." });
    }

    await DBMODELS.TripSettlement.update(updatedData, {
      where: { ID: settlementId },
    });

    // Unsettle previous trips linked to this settlement
    await DBMODELS.TripPlan.update(
      { Is_Settled: null },
      { where: { Is_Settled: settlementId } }
    );

    // Check for already settled new trips (different from this settlement)
    const alreadySettledTrips = await DBMODELS.TripPlan.findAll({
      where: {
        ID: { [Op.in]: tripIds },
        Is_Settled: { [Op.and]: [{ [Op.not]: null }, { [Op.not]: settlementId }] },
      },
      attributes: ["ID", "Is_Settled"],
      raw: true,
    });

    if (alreadySettledTrips.length > 0) {
      return res.status(400).json({
        error: "One or more trips are already settled with another settlement.",
        settledTrips: alreadySettledTrips.map((t) => t.ID),
      });
    }

    // Update new trip links to point to this settlement
    await DBMODELS.TripPlan.update(
      { Is_Settled: settlementId },
      { where: { ID: { [Op.in]: tripIds } } }
    );

    return res.status(200).json({
      status: "200",
      message: "Trip settlement updated and associated trips modified successfully",
      tripSettlementId: settlementId,
    });

  } catch (error) {
    console.error("Error in UpdateSettlement:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};


module.exports.updateDriverDebit = async (req, res) => {
  try {
    const {
      driverId,
      settledId,
      CashDebit,
      dieselQtyDB,
      DieselAmtDB,
      VehicleId,
      settledDate,
      Remark,
      total,
      DieselRate,
    } = req.body;

    if (!driverId || !settledId || !VehicleId) {
      return res
        .status(400)
        .json({ error: "driverId, settledId, and VehicleId are required." });
    }

    const formatedDate = settledDate
      ? moment(settledDate).format("YYYY-MM-DD HH:mm:ss")
      : moment().format("YYYY-MM-DD HH:mm:ss");

    const data = {
      DriverId: driverId,
      SettleId: settledId,
      CashDebit: CashDebit,
      DieselQtyDB: dieselQtyDB,
      DieselAmtDB: DieselAmtDB,
      VehcileId: VehicleId,
      Settledate: formatedDate,
      Remarks: Remark,
      Total: total,
      category: "drivers",
      DieselRate,
    };

    const existingDebit = await DBMODELS.DriverDebits.findOne({
      where: { SettleId: settledId },
    });

    if (existingDebit) {
      await DBMODELS.DriverDebits.update(data, {
        where: { SettleId: settledId },
      });
      return res
        .status(200)
        .json({ status: "200", message: "Driver debit updated successfully." });
    } 
    else {
      await DBMODELS.DriverDebits.create(data);
      return res
        .status(201)
        .json({ status: "201", message: "Driver debit created successfully." });
    }
  } catch (error) {
    console.error("Error in Update Driver Debit:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

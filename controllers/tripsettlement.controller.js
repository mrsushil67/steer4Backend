const { DBMODELS } = require("../models/init-models");
const moment = require("moment");
const { Op, fn, col, literal, where, Sequelize } = require("sequelize");

module.exports.getDetailsforTripSettlement = async (req, res) => {
  try {
    const { tripId } = req.body;
    if (!tripId) {
      return res.status(400).json({ error: "Trip ID is required." });
    }

    const tripPlan = await DBMODELS.TripPlan.findOne({
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
        [col("CustRateMaps.RouteString"), "RouteString"],
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
          required: false,
        },
        {
          model: DBMODELS.Driver,
          as: "Driver",
          attributes: [],
          required: false,
        },
        {
          model: DBMODELS.CustomerMaster,
          as: "CustomerMasters",
          attributes: [],
          required: false,
        },
        {
          model: DBMODELS.RouteMaster,
          as: "route_master",
          attributes: [],
          required: false,
          include: [
            {
              model: DBMODELS.city,
              as: "source_city",
              attributes: [],
              required: false,
            },
            {
              model: DBMODELS.city,
              as: "dest_city",
              attributes: [],
              required: false,
            },
          ],
        },
        {
          model: DBMODELS.CustRateMap,
          as: "CustRateMaps",
          attributes: [],
        },
      ],
      where: {
        [Op.and]: [{ ID: tripId }, { Is_Completed: 1 }],
      },
      raw: true,
    });
    // 2. Fetch TripOperations separately
    const tripOperations = await DBMODELS.TripOperation.findAll({
      where: { TripId: tripId },
      attributes: ["TripNo", "ATD", "ATA"],
      raw: true,
    });

    let ATD = null;
    let ATA = null;

    const opA = tripOperations.find((op) => op.TripNo?.trim().endsWith("A"));
    const opB = tripOperations.find((op) => op.TripNo?.trim().endsWith("B"));

    if (opA && opB) {
      ATD = opA.ATD;
      ATA = opB.ATA;
    } else if (opA) {
      ATD = opA.ATD;
      ATA = opA.ATA;
    }

    // 3. Fetch TripAdvance (PaidBy = 1)
    const tripAdvance = await DBMODELS.TripAdvance.findAll({
      attributes: [
        "Id",
        "Ticket",
        "TripId",
        "TtripNo",
        "Cash",
        "DieselQty",
        "DieselDt",
        "DieselVendor",
        "Location",
        "AdjDiesel",
        "RemDiesel",
        "VNumer",
        "Driver1Id",
        "Driver2Id",
        "Diesel_Rate",
        "Remark",
        "createdBy",
        "CreatedTime",
        "Qty",
        "Amt",
        "FillCat",
        "TotalAmt",
        "ExpCategory",
        "PaidBy",
        [col("TripPlan.TripSheet"), "TripSheet"],
      ],
      include: [
        {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          attributes: [],
          required: false,
        },
        {
          model: DBMODELS.PumpDetails,
          as: "PumpDetails",
          // required: false,
        },
      ],
      where: {
        TripId: tripId,
        PaidBy: 1,
      },
      raw: true,
    });

    console.log("Trip Advance Data: ", tripAdvance);

    // 3. Fetch TripOnroute (PaidBy = 2)
    const tripOnroute = await DBMODELS.TripAdvance.findAll({
      attributes: [
        "Id",
        "Ticket",
        "TripId",
        "TtripNo",
        "Cash",
        "DieselQty",
        "DieselDt",
        "DieselVendor",
        "Location",
        "AdjDiesel",
        "RemDiesel",
        "VNumer",
        "Driver1Id",
        "Driver2Id",
        "Diesel_Rate",
        "Remark",
        "createdBy",
        "CreatedTime",
        "Qty",
        "Amt",
        "FillCat",
        "TotalAmt",
        "ExpCategory",
        "PaidBy",
        [col("TripPlan.TripSheet"), "TripSheet"],
      ],
      include: [
        {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          attributes: [],
          required: false,
        },
        {
          model: DBMODELS.PumpDetails,
          as: "PumpDetails",
          // required: false,
        },
      ],
      where: {
        TripId: tripId,
        PaidBy: 2,
      },
      raw: true,
    });

    const TotalAdvanceCash = tripAdvance.reduce(
      (sum, item) => sum + (parseFloat(item.Cash) || 0),
      0
    );
    const TotalAdvanceDiesel = tripAdvance.reduce(
      (sum, item) => sum + (parseFloat(item.DieselQty) || 0),
      0
    );
    const TotalOnrouteCash = tripOnroute.reduce(
      (sum, item) => sum + (parseFloat(item.Cash) || 0),
      0
    );
    const TotalOnrouteDiesel = tripOnroute.reduce(
      (sum, item) => sum + (parseFloat(item.DieselQty) || 0),
      0
    );

    const round = (n) => parseFloat(n.toFixed(2));

    const totalExpence = {
      TotalTipCash: round(
        tripAdvance.reduce(
          (sum, item) => sum + (parseFloat(item.Cash) || 0),
          0
        ) +
          tripOnroute.reduce(
            (sum, item) => sum + (parseFloat(item.Cash) || 0),
            0
          )
      ),
      TotalTripDiesel: round(
        tripAdvance.reduce(
          (sum, item) => sum + (parseFloat(item.DieselQty) || 0),
          0
        ) +
          tripOnroute.reduce(
            (sum, item) => sum + (parseFloat(item.DieselQty) || 0),
            0
          )
      ),
    };

    const tripSettlement = {
      tripPlan: {
        ...tripPlan,
        ATD,
        ATA,
        TotalAdvanceCash,
        TotalAdvanceDiesel,
        TotalOnrouteCash,
        TotalOnrouteDiesel,
      },
      tripAdvance,
      tripOnroute,
      totalExpence,
    };

    if (tripSettlement.tripPlan.TripId === null) {
      return res.status(404).json({
        status: "404",
        message: "Trip settlement not found for the given trip ID.",
      });
    }

    return res
      .status(200)
      .json({ status: "200", message: "Record Found", tripSettlement });
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

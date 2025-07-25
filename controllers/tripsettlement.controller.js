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
        }
      ],
      where: {
        ID: tripId,
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
      attributes: ["*", [col("TripPlan.TripSheet"), "TripSheet"]],
      include: [
        {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          attributes: [],
          required: false,
        },
      ],
      where: {
        TripId: tripId,
        PaidBy: 1,
      },
      raw: true,
    });

    // 3. Fetch TripOnroute (PaidBy = 2)
    const tripOnroute = await DBMODELS.TripAdvance.findAll({
      attributes: ["*", [col("TripPlan.TripSheet"), "TripSheet"]],
      include: [
        {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          attributes: [],
          required: false,
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
      // GPsKms,
      // GPsKmsExd,
      // GoogleKms,
      // GoogleKmsExd,
      // StdKms,
      StartKms,
      CloseKms,
      TotalRun,
      // ApproveKms,
      // RatePkm,
      // ApproveAmt,
      TAdvanceCash,
      TAdvncDiesl,
      TOnRTCash,
      TOnRTDiesel,
      // TollCash,
      // HandlingChrgs,
      OtherChargs,
      // BalanceCash,
      BalanceDiesl,
      OtherChargsGvnBy,
      TCash,
      TDiesel,
      // DieselRT,
      FastTag,
      FastTagNew,
      HChargs,
      OverChargs,
      OverloadReamrk,
      Remark,
      // ToPay,
      Mileage,
      ExcDiesel,
      CreatedDate,
      // CreatedBy,
      UpdateDate,
      // UpdateBy,
      // StartRemark,
      // ExtraDiesel,
      MCDToll,
      // CashReturn,
      // MechCharge,
      MCDInCash,
      Date,
      CustName,
      // Is_received,
      // RDate,
      // Is_Type,
      // Days,
      // PDate,
      // FixedCash,
      // FixedDiesel,
      DeptDate,
      ATA,
      dalaCharge,
      DalaChargeRemark,
      // TotalAmtPaid,
      // Tcat,
      // DieselAmount,
      // ToPayReturn,
      OthChargesToD,
      // vehiclDebitD,
      Parking,
      Kanta,
      Challan,
      ChallanRemark,
      Pollution,
      // Entry,
      // EntryRemark,
      ExtraCash,
      Maintanance_die,
      // TCommission,
    } = req.body;

    console.log("Body : ", req.body);

    if (!TCash || !TDiesel) {
      return res
        .status(400)
        .json({ error: "missing TCash or TDiesel required." });
    }

    const formattedCreatedDate = CreatedDate
      ? moment(CreatedDate, "YYYY-MM-DD").toDate()
      : new Date();

    const formattedUpdatedDate = UpdateDate
      ? moment(UpdateDate, "YYYY-MM-DD").toDate()
      : new Date();

    const data = {
      TCash,
      TDiesel,
      StartKms,
      CloseKms,
      TotalRun,
      Mileage,
      ExcDiesel,
      Maintanance_die,
      BalanceDiesl,
      CreatedDate: formattedCreatedDate,
      MCDToll,
      MCDInCash,
      FastTag,
      FastTagNew,
      TOnRTCash,
      HChargs,
      OverChargs,
      OverloadReamrk,
      OtherChargs,
      dalaCharge,
      DalaChargeRemark,
      Parking,
      Kanta,
      Challan,
      ChallanRemark,
      Pollution,
      ExtraCash,
      OthChargesToD,

      Remark,

      ApproveKms,
      RatePkm,
      ApproveAmt,
      TAdvanceCash,
      TAdvncDiesl,

      TOnRTDiesel,
      TollCash,
      HandlingChrgs,

      BalanceCash,
      OtherChargsGvnBy,

      // DieselRT,

      // ToPay,

      // CreatedBy,
      // UpdateDate: formattedUpdatedDate,
      // UpdateBy,
      // StartRemark,
      // ExtraDiesel,

      // CashReturn,
      // MechCharge,

      // Date,
      // CustName,
      // Is_received,
      // RDate,
      // Is_Type,
      // Days,
      // PDate,
      // FixedCash,
      // FixedDiesel,
      // DeptDate,
      // ATA,

      // TotalAmtPaid,
      // Tcat,
      // DieselAmount,
      // ToPayReturn,

      // vehiclDebitD,

      // Entry,
      // EntryRemark,

      // TCommission,
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

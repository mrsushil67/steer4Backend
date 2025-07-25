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
        [
          fn("GROUP_CONCAT", literal('TripPlan.DepartureTime SEPARATOR ","')),
          "DeptTime",
        ],
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
      ],
      where: {
        ID: tripId,
      },
      raw: true,
    });

    // 2. Fetch TripAdvance (PaidBy = 1)
    const tripAdvance = await DBMODELS.TripAdvance.findAll({
      attributes: ["*", [col("TripPlan.TripSheet"), "TripSheet"]],
      include: [
        {
          model: DBMODELS.TripPlan,
          as: 'TripPlan',
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
          as: 'TripPlan',
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

    // const totalExpence = {
    //   TripAdvance: tripAdvance.reduce((sum, item) => sum + parseFloat(item.Amount || 0), 0),
    //   TripOnroute: tripOnroute.reduce((sum, item) => sum + parseFloat(item.Amount || 0), 0),
    // }
    // Send Response
    res.json({
      tripPlan,
      tripAdvance,
      tripOnroute,
      // totalExpence,
    });
  } catch (error) {
    console.error("Error fetching details for trip settlement:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports.createTripSettlement = async (req, res) => {
  try {
    const {
      GPsKms,
      GPsKmsExd,
      GoogleKms,
      GoogleKmsExd,
      StdKms,
      StartKms,
      CloseKms,
      TotalRun,
      ApproveKms,
      RatePkm,
      ApproveAmt,
      TAdvanceCash,
      TAdvncDiesl,
      TOnRTCash,
      TOnRTDiesel,
      TollCash,
      HandlingChrgs,
      OtherChargs,
      BalanceCash,
      BalanceDiesl,
      OtherChargsGvnBy,
      TCash,
      TDiesel,
      DieselRT,
      FastTag,
      FastTagNew,
      HChargs,
      OverChargs,
      OverloadReamrk,
      Remark,
      ToPay,
      Mileage,
      ExcDiesel,
      CreatedDate,
      CreatedBy,
      UpdateDate,
      UpdateBy,
      StartRemark,
      ExtraDiesel,
      MCDToll,
      CashReturn,
      MechCharge,
      MCDInCash,
      Date,
      CustName,
      Is_received,
      RDate,
      Is_Type,
      Days,
      PDate,
      FixedCash,
      FixedDiesel,
      DeptDate,
      ATA,
      dalaCharge,
      DalaChargeRemark,
      TotalAmtPaid,
      Tcat,
      DieselAmount,
      ToPayReturn,
      OthChargesToD,
      vehiclDebitD,
      Parking,
      Kanta,
      Challan,
      ChallanRemark,
      Pollution,
      Entry,
      EntryRemark,
      ExtraCash,
      Maintanance_die,
      TCommission,
    } = req.body;

    if (!GPsKms) {
      return res.status(400).json({ error: "missing GPsKms required." });
    }

    const formattedCreatedDate = CreatedDate
      ? moment(CreatedDate, "YYYY-MM-DD").toDate()
      : new Date();

    const formattedUpdatedDate = UpdateDate
      ? moment(UpdateDate, "YYYY-MM-DD").toDate()
      : new Date();

    const data = {
      GPsKms,
      GPsKmsExd,
      GoogleKms,
      GoogleKmsExd,
      StdKms,
      StartKms,
      CloseKms,
      TotalRun,
      ApproveKms,
      RatePkm,
      ApproveAmt,
      TAdvanceCash,
      TAdvncDiesl,
      TOnRTCash,
      TOnRTDiesel,
      TollCash,
      HandlingChrgs,
      OtherChargs,
      BalanceCash,
      BalanceDiesl,
      OtherChargsGvnBy,
      TCash,
      TDiesel,
      DieselRT,
      FastTag,
      FastTagNew,
      HChargs,
      OverChargs,
      OverloadReamrk,
      Remark,
      ToPay,
      Mileage,
      ExcDiesel,
      CreatedDate: formattedCreatedDate,
      CreatedBy,
      UpdateDate: formattedUpdatedDate,
      UpdateBy,
      StartRemark,
      ExtraDiesel,
      MCDToll,
      CashReturn,
      MechCharge,
      MCDInCash,
      Date,
      CustName,
      Is_received,
      RDate,
      Is_Type,
      Days,
      PDate,
      FixedCash,
      FixedDiesel,
      DeptDate,
      ATA,
      dalaCharge,
      DalaChargeRemark,
      TotalAmtPaid,
      Tcat,
      DieselAmount,
      ToPayReturn,
      OthChargesToD,
      vehiclDebitD,
      Parking,
      Kanta,
      Challan,
      ChallanRemark,
      Pollution,
      Entry,
      EntryRemark,
      ExtraCash,
      Maintanance_die,
      TCommission,
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

const { fn, col, literal, Op } = require("sequelize");
const { DBMODELS } = require("../models/init-models");
const moment = require("moment");
const generateTicket = require("../services/ExpenceTicket");

module.exports.getTripExpenceList = async (req, res) => {
  try {
    const { vehicleNo = null, fromDate = null, toDate = null } = req.body || {};

    const WhereCondition = {};

    if (vehicleNo !== null) {
      WhereCondition[Op.or] = [
        { "$TripPlan.TripSheet$": { [Op.like]: `%${vehicleNo}%` } },
        { "$TripPlan.Vehicle.VNumer$": { [Op.like]: `%${vehicleNo}%` } },
      ];
    }

    if (fromDate && toDate) {
      WhereCondition.ATD = {
        [Op.between]: [new Date(fromDate), new Date(toDate)],
      };
    } else if (fromDate) {
      WhereCondition.ATD = {
        [Op.gte]: new Date(fromDate),
      };
    } else if (toDate) {
      WhereCondition.ATD = {
        [Op.lte]: new Date(toDate),
      };
    }

    console.log(WhereCondition);
    const getAllTripExpence = await DBMODELS.TripOperation.findAll({
      where: WhereCondition,
      attributes: [
        "Id",
        "TripNo",
        "TripId",
        "InvoiceCopy",
        "LRCopy",
        "DAV",
        "GatePass",
        "POD",
        "EwayBilNo",
        "ATD",
        "CreatedBy",
        "CreatedTime",
        "ATA",
        "AmendReason",
        "Stat",
        "StartBy",
        "OnRouteBy",
        "CloseBy",
        "Is_Invoice",
        "Remark",
        "OpeningKm",
        "ClosingKm",
        "ActulaKm",
        "CVerify",
        "TripSheetNo",
        [fn("SUM", col("TripAdvance.Cash")), "advanceCash"],
        [fn("SUM", col("TripAdvance.DieselQty")), "advanceDieselQty"],
        [fn("MAX", col("TripAdvance.Id")), "TripAdvanceId"],
        [fn("MAX", col("TripAdvance.Ticket")), "Ticket"],
        [fn("MAX", col("TripAdvance.TripId")), "TripId"],
        [fn("MAX", col("TripAdvance.TtripNo")), "TtripNo"],
        [fn("MAX", col("TripAdvance.AdjDiesel")), "AdjDiesel"],
        [fn("MAX", col("TripAdvance.RemDiesel")), "RemDiesel"],
        [fn("MAX", col("TripAdvance.Diesel_Rate")), "Diesel_Rate"],
        [fn("MAX", col("TripAdvance.Amt")), "Amt"],
        [fn("MAX", col("TripAdvance.TotalAmt")), "TotalAmt"],
        [fn("SUM", col("OnRouteExp.Amt")), "onRouteCash"],
        [fn("SUM", col("OnRouteExp.TotalAmt")), "onRouteDieselAmt"],
        [fn("SUM", col("OnRouteExp.DieselQty")), "onRouteDieselQty"],
        [fn("MAX", col("OnRouteExp.Id")), "onRouteId"],
        [fn("MAX", col("OnRouteExp.Ticket")), "onRouteTicket"],
        [fn("MAX", col("OnRouteExp.TripId")), "onRouteTripId"],
        [fn("MAX", col("OnRouteExp.TripNo")), "onRouteTripNo"],
        // [fn("MAX", col("OnRouteExp.AdjDiesel")), "AdjDiesel"],
        // [fn("MAX", col("OnRouteExp.RemDiesel")), "RemDiesel"],
        // [fn("MAX", col("OnRouteExp.Diesel_Rate")), "Diesel_Rate"],
        // [fn("MAX", col("OnRouteExp.Amt")), "Amt"],
      ],
      include: [
        {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          include: [
            {
              model: DBMODELS.MarketCust,
              as: "MarketCust",
              // attributes: ["CustId", "CustomerName", "CustCode", "GSTNo"],
            },
            {
              model: DBMODELS.CustomerMaster,
              as: "CustomerMasters",
              attributes: ["CustId", "CustomerName", "CustCode", "GSTNo"],
            },
            {
              model: DBMODELS.Vehicle,
              as: "Vehicle",
              attributes: ["VehicleID", "VNumer"],
            },
            {
              model: DBMODELS.Driver,
              as: "Driver",
              attributes: ["DriverID", "DName"],
            },
            // {
            //   model: DBMODELS.RouteMaster,
            //   as: "route_master",
            //   attributes: ["RouteId"],
            //   include: [
            //     {
            //       model: DBMODELS.city,
            //       as: "source_city",
            //       attributes: ["CityId", "CityName", "latitude", "longitude"],
            //     },
            //     {
            //       model: DBMODELS.city,
            //       as: "dest_city",
            //       attributes: ["CityId", "CityName", "latitude", "longitude"],
            //     },
            //   ],
            // },
            {
              model: DBMODELS.CustRateMap,
              as: "CustRateMaps",
              attributes: [
                "ID",
                "CustId",
                "RouteId",
                "RouteType",
                "TripType",
                "TAT",
                "RouteString",
              ],
              on: literal(
                "`TripPlan`.`RouteId` = `TripPlan->CustRateMaps`.`RouteId` AND `TripPlan`.`CustId` = `TripPlan->CustRateMaps`.`CustId` AND `TripPlan`.`TripType` = `TripPlan->CustRateMaps`.`TripType`"
              ),
              include: [
                {
                  model: DBMODELS.TripType,
                  as: "trip_type",
                  attributes: ["Id", "TypeName"],
                },
              ],
              //   attributes: [
              //     "ID",
              //     "CustId",
              //     "RouteId",
              //     "RouteType",
              //     "TripType",
              //     "RouteString",
              //   ],
            },
          ],
        },
        {
          model: DBMODELS.TripAdvance,
          as: "TripAdvance",
          on: literal(
            "`TripOperation`.`TripId` = `TripAdvance`.`TripId` AND `TripOperation`.`TripNo` = `TripAdvance`.`TtripNo`"
          ),
          attributes: [],
        },
        {
          model: DBMODELS.OnRouteExp,
          as: "OnRouteExp",
          on: literal(
            "`TripOperation`.`TripId` = `OnRouteExp`.`TripId` AND `TripOperation`.`TripNo` = `OnRouteExp`.`TripNo`"
          ),
          attributes: [],
        },
      ],
      group: [
        "TripOperation.Id",
        "TripOperation.TripNo",
        "TripOperation.TripId",
        "TripOperation.InvoiceCopy",
        "TripOperation.LRCopy",
        "TripOperation.DAV",
        "TripOperation.GatePass",
        "TripOperation.POD",
        "TripOperation.EwayBilNo",
        "TripOperation.ATD",
        "TripOperation.CreatedBy",
        "TripOperation.CreatedTime",
        "TripOperation.ATA",
        "TripOperation.AmendReason",
        "TripOperation.Stat",
        "TripOperation.StartBy",
        "TripOperation.OnRouteBy",
        "TripOperation.CloseBy",
        "TripOperation.Is_Invoice",
        "TripOperation.Remark",
        "TripOperation.OpeningKm",
        "TripOperation.ClosingKm",
        "TripOperation.ActulaKm",
        "TripOperation.CVerify",
        "TripOperation.TripSheetNo",

        // Add groupings for included models if necessary, e.g., TripPlan fields
        "TripPlan.ID",
        "TripPlan.CustId",
        "TripPlan.RouteId",
        "TripPlan.TripType",
        "TripPlan.VehicleId",
        "TripPlan.Driver1Id",
        "TripPlan.Driver2Id",
        "TripPlan.VPlaceTime",
        "TripPlan.DepartureTime",
        "TripPlan.Remark",
        "TripPlan.TripSheet",
        "TripPlan.CreatedBy",
        "TripPlan.CreatedTime",
        "TripPlan.Status",
        "TripPlan.Is_Amended",
        "TripPlan.AmendReason",
        "TripPlan.ParentTripNo",
        "TripPlan.BookingType",
        "TripPlan.PlanCat",
        "TripPlan.Is_Completed",
        "TripPlan.Is_Settled",
        "TripPlan.Is_Verified",
        "TripPlan.Tcat",
        "TripPlan.BrId",
        "TripPlan.Is_peak",

        // If you're selecting any attributes from joined models like Vehicle, Driver, etc.
        "TripPlan.Vehicle.VehicleID",
        "TripPlan.Vehicle.VNumer",
        // "TripPlan.Driver.DriverID",
        // "TripPlan.Driver.DName",
        // "TripPlan.route_master.RouteId",
        // "TripPlan.route_master.source_city.CityId",
        // "TripPlan.route_master.source_city.CityName",
        // "TripPlan.route_master.source_city.latitude",
        // "TripPlan.route_master.source_city.longitude",
        // "TripPlan.route_master.dest_city.CityId",
        // "TripPlan.route_master.dest_city.CityName",
        // "TripPlan.route_master.dest_city.latitude",
        // "TripPlan.route_master.dest_city.longitude",
        "TripPlan.CustRateMaps.ID",
        "TripPlan.CustRateMaps.CustId",
        "TripPlan.CustRateMaps.RouteId",
        "TripPlan.CustRateMaps.RouteType",
        "TripPlan.CustRateMaps.TripType",
        "TripPlan.CustRateMaps.RouteString",
        "TripPlan.CustRateMaps.trip_type.Id",
        "TripPlan.CustRateMaps.trip_type.TypeName",
      ],
    });

    const getTotalCash = getAllTripExpence.reduce((acc, trip) => {
      const totalCash = Number(trip.dataValues.advanceCash) || 0;
      return acc + totalCash;
    }, 0);

    const getOnRouteCash = getAllTripExpence.reduce((acc, trip) => {
      const totalOnRouteCash = Number(trip.dataValues.onRouteCash);
      if (!isNaN(totalOnRouteCash)) {
        return acc + totalOnRouteCash;
      } else {
        console.log(
          `Invalid onRouteCash value: ${trip.dataValues.onRouteCash}`
        ); // Log invalid values
        return acc;
      }
    }, 0);

    const getTotalDieselQty = getAllTripExpence.reduce((acc, trip) => {
      const totalDieselQty = Number(trip.dataValues.advanceDieselQty) || 0;
      return acc + totalDieselQty;
    }, 0);

    const getOnRouteDieselQty = getAllTripExpence.reduce((acc, trip) => {
      const totalOnRouteDieselQty =
        Number(trip.dataValues.onRouteDieselQty) || 0;
      return acc + totalOnRouteDieselQty;
    }, 0);

    const total = {
      TotalCash: getTotalCash + getOnRouteCash,
      TotalDieselQty: getTotalDieselQty + getOnRouteDieselQty,
    };

    if (getAllTripExpence.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No record Found",
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Trip Expence List",
      Total: total,
      data: getAllTripExpence,
    });
  } catch (error) {
    console.log("Error in getTripExpenceList:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server Error" });
  }
};

module.exports.getExpenceCategoryList = async (req, res) => {
  try {
    const expenceCategories = await DBMODELS.ExpenseCategory.findAll({});
    if (expenceCategories.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No Record Found",
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Expence Category List",
      data: expenceCategories,
    });
  } catch (error) {
    console.log("Expence in getExpenceCategoryList : ", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server Error" });
  }
};

module.exports.getPaymentMode = async (req, res) => {
  try {
    const paymentMode = await DBMODELS.PaymentType.findAll({});
    if (paymentMode.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No Record Found",
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Record found",
      data: paymentMode,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.getPumpVendor = async (req, res) => {
  try {
    const pumpVendor = await DBMODELS.PumpDetails.findAll({
      include: [
        {
          model: DBMODELS.VendorMaster,
          as: "VendorMaster",
          required: true,
          attributes: [
            "VendId",
            "user_id",
            "VendName",
            "VendCode",
            "GstName",
            "Phone",
            "Email",
            "BillingCycle",
            "VendType",
          ],
        },
      ],
    });

    if (pumpVendor.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No Record Found",
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Pump Vendor List",
      data: pumpVendor,
    });
  } catch (error) {
    console.error("Error in createTripAdvanceExpence:", error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
module.exports.createTripAdvanceExpence = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      TripId,
      TtripNo,
      Advance,
      DieselQty,
      DieselDate,
      DieselVendor,
      VNumer,
      Driver1Id,
      Diesel_Rate,
      Remark,
      paymentMode,
      TotalAmt,
      ExpCategory,
      paymentType,
    } = req.body;

    if (!TripId || !TtripNo || !ExpCategory || !paymentType) {
      return res.status(400).json({
        status: "400",
        message: "Missing required fields",
      });
    }

    // Check for Cash and Diesel required fields
    if (
      Advance === undefined ||
      Advance === null ||
      Advance === "" ||
      Advance <= 0
    ) {
      if (!DieselQty || !DieselDate || !DieselVendor || !Diesel_Rate) {
        return res.status(400).json({
          status: "400",
          message: "Missing required fields for diesel",
        });
      }
    }

    if (
      DieselQty === undefined ||
      DieselQty === null ||
      DieselQty === "" ||
      DieselQty <= 0
    ) {
      if (!paymentType) {
        return res.status(400).json({
          status: "400",
          message: "Missing required fields for cash",
        });
      }
    }

    const ticket = generateTicket(TripId);

    const formattedDieselDate = DieselDate
      ? moment(DieselDate, "YYYY-MM-DD HH:mm:ss").toDate()
      : null;

    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    const dataModel = {
      Ticket: ticket,
      TripId,
      TtripNo,
      Cash: Advance || 0,
      DieselQty,
      DieselDt: formattedDieselDate,
      DieselVendor,
      VNumer,
      Driver1Id,
      Diesel_Rate,
      Remark,
      CreatedBy: userId,
      CreatedTime: currentTime,
      Amt: 0,
      FillCat: paymentMode,
      TotalAmt,
      ExpCategory,
      PaidBy: paymentType,
    };

    // Insert the data into the database
    const tripAdvance = await DBMODELS.TripAdvance.create(dataModel);
    return res.status(200).json({
      status: "200",
      message: "Trip advance expense created successfully",
      data: tripAdvance,
    });
  } catch (error) {
    console.error("Error in createTripAdvanceExpence:", error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

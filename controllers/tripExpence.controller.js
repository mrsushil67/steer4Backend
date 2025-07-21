const { fn, col, literal, Op } = require("sequelize");
const { DBMODELS } = require("../models/init-models");
const moment = require("moment");
const generateTicket = require("../services/ExpenceTicket");

module.exports.getTripExpenceList = async (req, res) => {
  try {
    const { vehicleNo = null, fromDate = null, toDate = null } = req.body || {};

    const WhereCondition = {};

    if (vehicleNo) {
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
        [fn("MAX", col("TripAdvance.TripId")), "TripAdvance_TripId"],
        [fn("MAX", col("TripAdvance.TtripNo")), "TripAdvance_TripNo"],
        [fn("MAX", col("TripAdvance.AdjDiesel")), "AdjDiesel"],
        [fn("MAX", col("TripAdvance.RemDiesel")), "RemDiesel"],
        [fn("MAX", col("TripAdvance.Diesel_Rate")), "Diesel_Rate"],
        [fn("MAX", col("TripAdvance.Amt")), "Amt"],
        [fn("MAX", col("TripAdvance.TotalAmt")), "TotalAmt"],
        [fn("MAX", col("TripAdvance.PaidBy")), "PaidBy"],
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
     order: [["Id", "DESC"]]
    });

    const getTotalCash = getAllTripExpence.reduce((acc, trip) => {
      const totalCash = Number(trip?.dataValues?.advanceCash) || 0;
      return acc + totalCash;
    }, 0);

    const getTotalDieselQty = getAllTripExpence.reduce((acc, trip) => {
      const totalDieselQty = Number(trip?.dataValues?.advanceDieselQty) || 0;
      return acc + totalDieselQty;
    }, 0);

    const total = {
      TotalCash: getTotalCash,
      TotalDieselQty: getTotalDieselQty,
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
          where: {
            VendType: 2,
          },
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
      TripNo,
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

    console.log("Body : ", req.body);

    if (!TripId || !TripNo || !ExpCategory || !paymentType) {
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
      ? moment(DieselDate, "YYYY-MM-DD").toDate()
      : null;

    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    const dataModel = {
      Ticket: ticket,
      TripId,
      TtripNo: TripNo,
      Cash: Advance || 0,
      DieselQty,
      DieselDt: formattedDieselDate,
      DieselVendor,
      VNumer,
      Driver1Id,
      Diesel_Rate,
      Remark,
      createdBy: userId,
      CreatedTime: currentTime,
      Amt: 0,
      FillCat: paymentMode,
      TotalAmt,
      ExpCategory,
      PaidBy: paymentType,
    };

    // Insert the data into the database
    const tripAdvance = await DBMODELS.TripAdvance.create(dataModel);
    return res.status(201).json({
      status: "201",
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

module.exports.showExpences = () => {
  try {
    console.log("This api for show expences Advance and OnRoute");
  } catch (error) {
    console.error("Error in showExpence:", error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.getTripAdvanceOnRouteExpence = async (req, res) => {
  try {
    const { tripId } = req.body || {};
    if (!tripId) {
      return res.status(400).json({
        status: "400",
        message: "Missing tripId",
      });
    }

    const expences = await DBMODELS.TripAdvance.findAll({
      where: {
        TripId: tripId,
      },
      order: [["PaidBy", "ASC"]],
    });

    if (!expences || expences.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No expense records found for the provided tripId.",
      });
    }

    console.log(expences);
    return res.status(200).json({
      status: "200",
      message: "Record Found",
      data: expences,
    });
  } catch (error) {
    console.error("Error in TripAdvanceOnRouteExpence:", error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.updateTripAdvanceOnRouteExpence = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      Id,
      Advance,
      DieselQty,
      DieselDate,
      DieselVendor,
      Diesel_Rate,
      Remark,
      paymentMode,
      TotalAmt,
      adBlueAmount,
      ExpCategory,
      paymentType,
      location,
    } = req.body;

    console.log("Body : ", req.body);

    if (!Id || !ExpCategory || !paymentType) {
      return res.status(400).json({
        status: "400",
        message: "Missing required fields Id or ExpCategory or paymentType",
      });
    }

    if (
      Advance === undefined ||
      Advance === null ||
      Advance === "" ||
      Advance <= 0
    ) {
      if (!DieselQty || !DieselDate || !DieselVendor || !Diesel_Rate) {
        return res.status(400).json({
          status: "400",
          message: "Missing required fields for diesel DieselQty, DieselDate, DieselVendor, Diesel_Rate",
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
          message: "Missing required fields for cash PaymentType",
        });
      }
    }

    const formattedDieselDate = DieselDate
      ? moment(DieselDate, "YYYY-MM-DD").toDate()
      : null;

    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    const dataModel = {
      Cash: Advance || 0,
      DieselQty,
      DieselDt: formattedDieselDate,
      DieselVendor,
      Diesel_Rate,
      Remark,
      createdBy: userId,
      CreatedTime: currentTime,
      Amt: 0,
      FillCat: paymentMode,
      TotalAmt,
      ExpCategory,
      Location: location,
      PaidBy: paymentType,
    };

    console.log("dataModel : ", dataModel);
    const updatedExpence = await DBMODELS.TripAdvance.update(dataModel, {
      where: {
        Id: Id,
      },
    });

    return res.status(200).json({
      status: "200",
      message: "Trip advance updated successfully",
      data: updatedExpence,
    });
    
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// module.exports.getTripExpenceList = async (req, res) => {
//   try {
//     const { vehicleNo = null, fromDate = null, toDate = null } = req.body || {};

//     const WhereCondition = {};

//     if (vehicleNo !== null) {
//       WhereCondition[Op.or] = [
//         { "$TripPlan.TripSheet$": { [Op.like]: `%${vehicleNo}%` } },
//         { "$TripPlan.Vehicle.VNumer$": { [Op.like]: `%${vehicleNo}%` } },
//       ];
//     }

//     if (fromDate && toDate) {
//       WhereCondition.ATD = {
//         [Op.between]: [new Date(fromDate), new Date(toDate)],
//       };
//     } else if (fromDate) {
//       WhereCondition.ATD = {
//         [Op.gte]: new Date(fromDate),
//       };
//     } else if (toDate) {
//       WhereCondition.ATD = {
//         [Op.lte]: new Date(toDate),
//       };
//     }

//     console.log(WhereCondition);
//     const getAllTripExpence = await DBMODELS.TripOperation.findAll({
//       where: WhereCondition,
//       attributes: {
//         include: [
//           // your SUM cases
//           [
//             fn(
//               "SUM",
//               literal(
//                 "CASE WHEN `TripAdvance`.`PaidBy` = 1 THEN `TripAdvance`.`Cash` ELSE 0 END"
//               )
//             ),
//             "AdvanceCash",
//           ],
//           [
//             fn(
//               "SUM",
//               literal(
//                 "CASE WHEN `TripAdvance`.`PaidBy` = 1 THEN `TripAdvance`.`DieselQty` ELSE 0 END"
//               )
//             ),
//             "AdvanceDieselQty",
//           ],
//           [
//             fn(
//               "SUM",
//               literal(
//                 "CASE WHEN `TripAdvance`.`PaidBy` = 2 THEN `TripAdvance`.`Cash` ELSE 0 END"
//               )
//             ),
//             "OnRouteCash",
//           ],
//           [
//             fn(
//               "SUM",
//               literal(
//                 "CASE WHEN `TripAdvance`.`PaidBy` = 2 THEN `TripAdvance`.`DieselQty` ELSE 0 END"
//               )
//             ),
//             "OnRouteDieselQty",
//           ],
//         ],
//       },
//       include: [
//         {
//           model: DBMODELS.TripPlan,
//           as: "TripPlan",
//           include: [
//             {
//               model: DBMODELS.MarketCust,
//               as: "MarketCust",
//             },
//             {
//               model: DBMODELS.CustomerMaster,
//               as: "CustomerMasters",
//               attributes: ["CustId", "CustomerName", "CustCode", "GSTNo"],
//             },
//             {
//               model: DBMODELS.Vehicle,
//               as: "Vehicle",
//               attributes: ["VehicleID", "VNumer"],
//             },
//             {
//               model: DBMODELS.Driver,
//               as: "Driver",
//               attributes: ["DriverID", "DName"],
//             },
//             {
//               model: DBMODELS.CustRateMap,
//               as: "CustRateMaps",
//               attributes: [
//                 "ID",
//                 "CustId",
//                 "RouteId",
//                 "RouteType",
//                 "TripType",
//                 "TAT",
//                 "RouteString",
//               ],
//               on: literal(
//                 "`TripPlan`.`RouteId` = `TripPlan->CustRateMaps`.`RouteId` AND `TripPlan`.`CustId` = `TripPlan->CustRateMaps`.`CustId` AND `TripPlan`.`TripType` = `TripPlan->CustRateMaps`.`TripType`"
//               ),
//               include: [
//                 {
//                   model: DBMODELS.TripType,
//                   as: "trip_type",
//                   attributes: ["Id", "TypeName"],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           model: DBMODELS.TripAdvance,
//           as: "TripAdvance",
//           on: literal(
//             "`TripOperation`.`TripId` = `TripAdvance`.`TripId` AND `TripOperation`.`TripNo` = `TripAdvance`.`TtripNo`"
//           ),
//         },
//       ],
//       group: [
//         "TripOperation.Id",
//         "TripOperation.TripNo",
//         "TripOperation.TripId",
//         "TripOperation.InvoiceCopy",
//         "TripOperation.LRCopy",
//         "TripOperation.DAV",
//         "TripOperation.GatePass",
//         "TripOperation.POD",
//         "TripOperation.EwayBilNo",
//         "TripOperation.ATD",
//         "TripOperation.CreatedBy",
//         "TripOperation.CreatedTime",
//         "TripOperation.ATA",
//         "TripOperation.AmendReason",
//         "TripOperation.Stat",
//         "TripOperation.StartBy",
//         "TripOperation.OnRouteBy",
//         "TripOperation.CloseBy",
//         "TripOperation.Is_Invoice",
//         "TripOperation.Remark",
//         "TripOperation.OpeningKm",
//         "TripOperation.ClosingKm",
//         "TripOperation.ActulaKm",
//         "TripOperation.CVerify",
//         "TripOperation.TripSheetNo",

//         // TripPlan
//         "TripPlan.ID",
//         "TripPlan.CustId",
//         "TripPlan.RouteId",
//         "TripPlan.TripType",
//         "TripPlan.VehicleId",
//         "TripPlan.Driver1Id",
//         "TripPlan.Driver2Id",
//         "TripPlan.VPlaceTime",
//         "TripPlan.DepartureTime",
//         "TripPlan.Remark",
//         "TripPlan.TripSheet",
//         "TripPlan.CreatedBy",
//         "TripPlan.CreatedTime",
//         "TripPlan.Status",
//         "TripPlan.Is_Amended",
//         "TripPlan.AmendReason",
//         "TripPlan.ParentTripNo",
//         "TripPlan.BookingType",
//         "TripPlan.PlanCat",
//         "TripPlan.Is_Completed",
//         "TripPlan.Is_Settled",
//         "TripPlan.Is_Verified",
//         "TripPlan.Tcat",
//         "TripPlan.BrId",
//         "TripPlan.Is_peak",

//         // TripPlan->MarketCust
//         "TripPlan->MarketCust.ID",
//         "TripPlan->MarketCust.Name",
//         "TripPlan->MarketCust.Phone",
//         "TripPlan->MarketCust.City",
//         "TripPlan->MarketCust.Address",

//         // TripPlan->CustomerMasters
//         "TripPlan->CustomerMasters.CustId",
//         "TripPlan->CustomerMasters.CustomerName",
//         "TripPlan->CustomerMasters.CustCode",
//         "TripPlan->CustomerMasters.GSTNo",

//         // TripPlan->Vehicle
//         "TripPlan->Vehicle.VehicleID",
//         "TripPlan->Vehicle.VNumer",

//         // TripPlan->Driver
//         "TripPlan->Driver.DriverID",
//         "TripPlan->Driver.DName",

//         // TripPlan->CustRateMaps
//         "TripPlan->CustRateMaps.ID",
//         "TripPlan->CustRateMaps.CustId",
//         "TripPlan->CustRateMaps.RouteId",
//         "TripPlan->CustRateMaps.RouteType",
//         "TripPlan->CustRateMaps.TripType",
//         "TripPlan->CustRateMaps.TAT",
//         "TripPlan->CustRateMaps.RouteString",

//         // TripPlan->CustRateMaps->trip_type
//         "TripPlan->CustRateMaps->trip_type.Id",
//         "TripPlan->CustRateMaps->trip_type.TypeName",

//         // TripAdvance
//         "TripAdvance.Id",
//         "TripAdvance.Ticket",
//         "TripAdvance.TripId",
//         "TripAdvance.TtripNo",
//         "TripAdvance.Cash",
//         "TripAdvance.DieselQty",
//         "TripAdvance.DieselDt",
//         "TripAdvance.DieselVendor",
//         "TripAdvance.Location",
//         "TripAdvance.AdjDiesel",
//         "TripAdvance.RemDiesel",
//         "TripAdvance.VNumer",
//         "TripAdvance.Driver1Id",
//         "TripAdvance.Driver2Id",
//         "TripAdvance.Diesel_Rate",
//         "TripAdvance.Remark",
//         "TripAdvance.createdBy",
//         "TripAdvance.CreatedTime",
//         "TripAdvance.Qty",
//         "TripAdvance.Amt",
//         "TripAdvance.FillCat",
//         "TripAdvance.TotalAmt",
//         "TripAdvance.ExpCategory",
//         "TripAdvance.PaidBy",
//       ],
//     });

//     if (getAllTripExpence.length === 0) {
//       return res.status(404).json({
//         status: "404",
//         message: "No record Found",
//       });
//     }
//     return res.status(200).json({
//       status: "200",
//       message: "Trip Expence List",
//       // Total: total,
//       data: getAllTripExpence,
//     });
//   } catch (error) {
//     console.log("Error in getTripExpenceList:", error);
//     return res
//       .status(500)
//       .json({ status: "500", message: "Internal server Error" });
//   }
// };

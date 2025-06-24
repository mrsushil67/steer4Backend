const { fn, col, literal } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.getTripExpenceList = async (req, res) => {
  try {
    const getAllTripExpence = await DBMODELS.TripOperation.findAll({
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
              model: DBMODELS.CustomerMaster,
              as: "CustomerMasters",
              attributes: ["CustId", "CustomerName", "CustCode", "GSTNo"],
            },
            {
              model: DBMODELS.Vehicle,
              as: "Vehicle",
              attributes: ["VehicleID", "VNumer"],
            },
            // {
            //   model: DBMODELS.Driver,
            //   as: "Driver",
            //   attributes: ["DriverID", "DName"],
            // },
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
          attributes: []
        }
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
    
    const getTotalDieselQty = getAllTripExpence.reduce((acc, trip) => {
      const totalDieselQty = Number(trip.dataValues.advanceDieselQty) || 0;
      return acc + totalDieselQty;
    }, 0);

    console.log("Total : ", getTotalCash, getTotalDieselQty)
    const total = {
      TotalCash: getTotalCash,
      TotalDieselQty: getTotalDieselQty,
    }
    return res.status(200).json({
      status: "200",
      message: "Trip Expence List",
      Total: total,
      data: getAllTripExpence,
    });
  } catch (error) {
    console.error("Error in getTripExpenceList:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server Error" });
  }
};

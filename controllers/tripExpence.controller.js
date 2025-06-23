const { literal, col, where } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.getTripExpenceList = async (req, res) => {
  try {
    const getAllTripExpence = await DBMODELS.TripOperation.findAll({
      include: [
        {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          include: [
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
            // {
            //   model: DBMODELS.CustRateMap,
            //   as: "CustRateMaps",
            // //   where: {
            // //     RouteId: col("TripPlan.RouteId"),
            // //     CustId: col("TripPlan.CustId"),
            // //     // TripType: col("TripPlan.TripType"),
            // //   },
            //   include: [
            //     {
            //       model: DBMODELS.TripType,
            //       as: "trip_type",
            //       attributes: ["Id", "TypeName"],
            //     },
            //   ],
            // //   attributes: [
            // //     "ID",
            // //     "CustId",
            // //     "RouteId",
            // //     "RouteType",
            // //     "TripType",
            // //     "RouteString",
            // //   ],
            // },
          ],
        },
        {
            model: DBMODELS.TripAdvance,
            as: "TripAdvance",
        }
      ],
    });
    const total = getAllTripExpence.length
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

const { Op } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.getRoutelist = async (req, res) => {
  try {
    const { CustId, RouteType } = req.body || {};

    if (!CustId || !RouteType) {
      return res
        .status(400)
        .json({ status: "400", message: "fill all fields" });
    }

    const allRoutes = await DBMODELS.CustRateMap.findAll({
      where: { CustId, RouteType },
      include: [
        {
          model: DBMODELS.TripType,
          as: "trip_type",
          required: true,
          attributes: ["Id", "TypeName"],
        },
        {
          model: DBMODELS.RouteMaster,
          as: "Route",
          required: true,
          attributes: ["RouteId", "CustId", "RouteCode", "Source", "Destination", "is_active"],
          where: {
            is_active: { [Op.ne]: 0 }
          }
        },
      ],
    });

    // Group routes by RouteId and collect trip types as an array
    const routesMap = new Map();
    allRoutes.forEach((route) => {
      if (!routesMap.has(route.RouteId)) {
        routesMap.set(route.RouteId, {
          ...route.toJSON(),
          trip_types: [],
        });
      }
      const tripType = route.trip_type
        ? {
            Id: route.trip_type.Id,
            TypeName: route.trip_type.TypeName,
          }
        : null;
      if (tripType) {
        routesMap.get(route.RouteId).trip_types.push(tripType);
      }
    });
    const routes = Array.from(routesMap.values());

    console.log(routes);

    if (routes.length === 0) {
      return res
        .status(404)
        .json({ status: "404", message: "No records found" });
    }

    return res
      .status(200)
      .json({ status: "200", message: "Records found", routes });
  } catch (error) {
    console.error("Error fetching route list:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

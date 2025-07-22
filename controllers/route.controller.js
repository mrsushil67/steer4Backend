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

    const routes = await DBMODELS.CustRateMap.findAll({
      where: { CustId, RouteType },
      // group: ['RouteId'],
      include: [
        {
          model: DBMODELS.TripType,
          as: "trip_type",
          required: true,
          attributes: ["Id", "TypeName"],
        },
      ],
    });

    // const routesMap = new Map();
    // allRoutes.forEach((route) => {
    //   if (!routesMap.has(route.RouteId)) {
    //     routesMap.set(route.RouteId, route);
    //   }
    // });
    // const routes = Array.from(routesMap.values());

    // console.log(routes);

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

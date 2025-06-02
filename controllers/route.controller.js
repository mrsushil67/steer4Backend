const { Op } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.getRoutelist = async (req, res) => {
  try {
    const { CustId = null, RouteCat = null } = req.body || {};

    const whereCondition =
      CustId || RouteCat
        ? {
            [Op.or]: [
              { CustId: CustId },
              { RouteCat: RouteCat }
            ]
          }
        : {};

    const routes = await DBMODELS.RouteMaster.findAll({
      where: whereCondition,
    });
    return res
      .status(200)
      .json({ status: "200", message: "Record found", routes });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

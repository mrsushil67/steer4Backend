const { literal, col, where, fn } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.getTripExpenceList = async (req, res) => {
  try {
    const getAllTripExpence = await DBMODELS.TripOperation.findAll({
      attributes: [
        [fn("SUM", col("TripAdvance.Cash")), "totalAdvanceAmount"],
      ],
      include: [
        {
          model: DBMODELS.TripAdvance,
          as: "TripAdvance",
        },
      ],
      group: ['TripOperation.id'],
    });
    const total = getAllTripExpence.length;
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

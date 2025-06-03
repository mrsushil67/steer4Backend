const { DBMODELS } = require("../models/init-models");

module.exports.tripPlan = async (req, res) => {
  try {

    const trip = await DBMODELS.TripPlanSchedule.get({});
    return res.status(200).json({status:"200", trip})
  } catch (error) {
    console.error("Error While creating tripSheet:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

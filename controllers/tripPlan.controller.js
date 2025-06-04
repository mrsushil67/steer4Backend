const { DBMODELS } = require("../models/init-models");

module.exports.checkTripPlan = async (req, res) => {
  try {

    const trip = await DBMODELS.TripPlanSchedule.findAll({});
    return res.status(200).json({status:"200", trip})
  } catch (error) {
    console.error("Error While creating tripSheet:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

module.exports.tripPlan = async (req, res) => {
  try {

    const userId = req.user.userId;
    console.log(userId)

    const {
      CustType,
      CustId,
      RouteId,
      TripType,
      VehicleSize,
      VehicleId,
      Driver1Id,
      Driver2Id,
      VPlaceTime,
      DepartureTime,
      Remark,
      TripSheet,
      StartKm,
    } = req.body;

    // Validate required fields
    if (
      !CustType ||
      !CustId ||
      !RouteId ||
      !TripType ||
      !VehicleSize ||
      !VehicleId ||
      !Driver1Id ||
      !VPlaceTime ||
      !DepartureTime ||
      !TripSheet||
      !StartKm
    ) {
      return res.status(400).json({
        status: "400",
        message: "Missing required fields",
      });
    }

    const dataModel = {
      CustType,
      CustId,
      RouteId,
      TripType,
      VehicleSize,
      VehicleId,
      Driver1Id,
      Driver2Id,
      VPlaceTime,
      DepartureTime,
      Remark,
      TripSheet,
      StartKm,
      CreatedBy : userId
    };

    const data = await DBMODELS.TripPlanSchedule.create(dataModel);

    return res
      .status(201)
      .json({ status: "201", message: "Record saved successfully", data });
  } catch (error) {

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        status: "409",
        message: "Duplicate key error",
      });
    }
   
    console.error("Error While creating tripSheet:", error);

    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

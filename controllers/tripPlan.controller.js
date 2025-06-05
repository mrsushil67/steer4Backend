const { DBMODELS } = require("../models/init-models");

module.exports.checkTripPlan = async (req, res) => {
  try {
    const { id } = req.query;

    const trip = id
      ? await DBMODELS.TripPlanSchedule.findOne({ where: { Id: id } })
      : await DBMODELS.TripPlanSchedule.findAll({});

    if (!trip || (Array.isArray(trip) && trip.length === 0)) {
      return res
        .status(404)
        .json({ status: "404", message: "No record found" });
    }

    return res.status(200).json({ status: "200",trip });
  } catch (error) {
    console.error("Error While fetching trip plan:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

module.exports.tripPlan = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId);

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
      !TripSheet ||
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
      CreatedBy: userId,
    };

    const data = await DBMODELS.TripPlanSchedule.create(dataModel);

    return res
      .status(201)
      .json({ status: "201", message: "Record saved successfully", data });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
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

module.exports.updateTrip = async (req, res) => {
  try {
    const { tripId } = req.query;
    const updateFields = req.body;

    if (!tripId) {
      return res.status(400).json({
        status: "400",
        message: "Missing tripId",
      });
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        status: "400",
        message: "Missing required fields",
      });
    }

    const [updatedRows] = await DBMODELS.TripPlanSchedule.update(updateFields, {
      where: { ID: tripId },
    });

    if (updatedRows === 0) {
      return res.status(404).json({
        status: "404",
        message: "Record not found",
      });
    }

    return res.status(200).json({
      status: "200",
      message: "Record updated successfully",
      updatedRows,
    });
  } catch (error) {
    console.error("Error While updating trip:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

module.exports.cancelTrip = async (req, res) => {
  try {
    const { tripId, status } = req.body || {};

    if (!tripId || !status) {
      return res
        .status(400)
        .json({ status: "400", message: "tripId or status missing" });
    }

    // Check if the status is already the same
    const existingTripPlanSchedule = await DBMODELS.TripPlanSchedule.findOne({
      where: { ID: tripId },
    });

    const existingTripPlan = await DBMODELS.TripPlan.findOne({
      where: { ID: tripId },
    });

    console.log("status : ", status, typeof status);
    console.log(
      "existingTripPlanSchedule.Status : ",
      existingTripPlanSchedule.Status
    );
    console.log("existingTripPlan.Status : ", existingTripPlan.Status);

    if (
      (existingTripPlanSchedule &&
        existingTripPlanSchedule.Status === parseInt(status)) ||
      (existingTripPlan && existingTripPlan.Status === parseInt(status))
    ) {
      return res.status(200).json({
        status: "200",
        message: `Status is already ${status}`,
      });
    }

    const [updatedTripPlanScheduleRows] =
      await DBMODELS.TripPlanSchedule.update(
        { Status: status },
        { where: { ID: tripId } }
      );

    const [updatedTripPlanRows] = await DBMODELS.TripPlan.update(
      { Status: status },
      { where: { ID: tripId } }
    );

    if (updatedTripPlanScheduleRows === 0 && updatedTripPlanRows === 0) {
      return res.status(404).json({
        status: "404",
        message: "Record not found in both tables",
      });
    }

    return res.status(201).json({
      status: "201",
      message: "Records updated successfully",
      updatedTripPlanScheduleRows,
      updatedTripPlanRows,
    });
  } catch (error) {
    console.error("Error While updating trip:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

module.exports.proceedTrip = async (req, res) => {
  try {
    const { tripId } = req.query;

    if (!tripId) {
      return res.status(400).json({ status: "400", message: "Missing tripId" });
    }

    const [updatedRows] = await DBMODELS.TripPlanSchedule.update(
      { is_final: 1 },
      { where: { ID: tripId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        status: "404",
        message: "No records updated, status might already be the same",
      });
    }

    const tripScheduleData = await DBMODELS.TripPlanSchedule.findOne({
      where: { ID: tripId },
    });

    if (!tripScheduleData) {
      return res.status(404).json({
        status: "404",
        message: "Record not found after update",
      });
    }
                     
    const tripPlanData = await DBMODELS.TripPlan.create({
      ...tripScheduleData.toJSON(),
    });

    return res.status(201).json({
      status: "201",
      message: `Trip proceeded`,
      updatedTripPlanSchedule: tripScheduleData,
      addedTripPlan: tripPlanData,
    });

  } catch (error) {
    console.error("Error while proceeding trip:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

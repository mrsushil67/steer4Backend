const { where, col, Op } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.checkTripPlan = async (req, res) => {
  try {

    const { vehicleNo = null } = req.body || {};

    const whereClause = {};

    if (vehicleNo) {
      whereClause["$TripPlan.Vehicle.VNumer$"] = {
      [Op.like]: `%${vehicleNo}%`,
      };
    }

    console.log("Where : ",whereClause)

    const data = await DBMODELS.TripOperation.findAll({
      where: whereClause,
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
              attributes: ["VehicleID", "VNumer", "FleetZize"],
            },
            {
              model: DBMODELS.Driver,
              as: "Driver",
              attributes: ["DriverID", "DName", "Licence"],
            },
            {
              model: DBMODELS.RouteMaster,
              as: "route_master",
              attributes: ["RouteId"],
              include: [
                {
                  model: DBMODELS.city,
                  as: "source_city",
                  attributes: ["CityName", "latitude", "longitude"],
                },
                {
                  model: DBMODELS.city,
                  as: "dest_city",
                  attributes: ["CityName", "latitude", "longitude"],
                },
              ],
            },
            {
              model: DBMODELS.TripType,
              as: "tripType",
              attributes: ["TypeName"],
            },
          ],
        },
      ],
    });

    const filteredTrips = data.filter((trip) => {
      const tripNo = trip?.TripNo;
      const lastLetter = tripNo.slice(-1);

      if (trip?.TripPlan?.TripType == 2) {
        if (lastLetter === "A" && trip.Stat !== 7) {
          return true;
        } else if (lastLetter === "B") {
          const correspondingATrip = data.find(
            (t) =>
              t?.TripNo === tripNo.slice(0, -1) + "A" &&
              t?.Stat === 7
          );
          if (correspondingATrip) {
            return true;
          }
        }
      } else {
        if (trip?.Stat !== 7) {
          return true;
        }
      }

      return false;
    });

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return res
        .status(404)
        .json({ status: "404", message: "No record found" });
    }

    return res
      .status(200)
      .json({ message: "Record found", data: filteredTrips });
  } catch (error) {
    console.error("Error while fetching trip operations:", error);
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

    console.log("Data : ", dataModel);

    const data = await DBMODELS.TripPlanSchedule.create(dataModel);

    return res
      .status(201)
      .json({ status: "201", message: "Record saved successfully" });
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
    const { tripId = null, status = null } = req.body || {};

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

    if (!existingTripPlanSchedule || !existingTripPlan) {
      return res
        .status(404)
        .json({ status: "404", message: "no renord found" });
    }

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

module.exports.tripOperations = async (req, res) => {
  try {
    const data = await DBMODELS.TripOperation.findAll({
      include: [{ model: DBMODELS.TripPlan, as: "TripPlan" }],
    });

    return res.status(200).json({ message: "Record found", data });
  } catch (error) {
    console.error("Error while fetching trip operations:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

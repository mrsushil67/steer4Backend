const { where, col } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.checkTripPlan = async (req, res) => {
  try {
    const { id } = req.query;

    const trip = id
      ? await DBMODELS.TripPlanSchedule.findAll({
          where: { ID: id },
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
              attributes:['RouteId'],
              include:[
                {
                  model: DBMODELS.city,
                  as: "source_city",
                  attributes: ['CityName','latitude','longitude']
                },
                {
                   model: DBMODELS.city,
                  as: "dest_city",
                  attributes: ['CityName','latitude','longitude']
                }
              ]
            },
            {
              model: DBMODELS.TripType,
              as: 'tripType',
              attributes: ['TypeName']
            }
          ],
          attributes: [
            "ID",
            "CustType",
            "CustId",
            "RouteId",
            "TripType",
            "VehicleId",
            "Driver1Id",
            "VPlaceTime",
            "DepartureTime",
            "TripSheet",
            "CreatedBy",
            "Status",
          ],
          order: [["ID", "ASC"]],
        })
      : await DBMODELS.TripPlanSchedule.findAll({
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
              attributes:['RouteId'],
              include:[
                {
                  model: DBMODELS.city,
                  as: "source_city",
                  attributes: ['CityName','latitude','longitude']
                },
                {
                   model: DBMODELS.city,
                  as: "dest_city",
                  attributes: ['CityName','latitude','longitude']
                }
              ]
            },
            {
              model: DBMODELS.TripType,
              as: 'tripType',
              attributes: ['TypeName']
            }
          ],
          attributes: [
            "ID",
            "CustType",
            "CustId",
            "RouteId",
            "TripType",
            "VehicleId",
            "Driver1Id",
            "VPlaceTime",
            "DepartureTime",
            "TripSheet",
            "CreatedBy",
            "Status",
          ],
          order: [["ID", "ASC"]],
        });

    if (!trip || (Array.isArray(trip) && trip.length === 0)) {
      return res
        .status(404)
        .json({ status: "404", message: "No record found" });
    }

    return res.status(200).json({ status: "200", trip });
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

    console.log("Data : ",dataModel)

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

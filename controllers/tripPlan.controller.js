const { where, col, Op, literal } = require("sequelize");
const { DBMODELS } = require("../models/init-models");
const moment = require("moment");

module.exports.checkTripPlan = async (req, res) => {
  try {
    const {
      vehicleNo = null,
      status = null,
      fromDate = null,
      toDate = null,
    } = req.body || {};

    let scheduleWhere = {
      [Op.and]: [{ is_final: 0 }, { Status: { [Op.ne]: 6 } }],
    };

    if (status !== null) {
      scheduleWhere.Status = status;
    }

    if (fromDate && toDate) {
      scheduleWhere.DepartureTime = {
        [Op.between]: [new Date(fromDate), new Date(toDate)],
      };
    } else if (fromDate) {
      scheduleWhere.DepartureTime = {
        [Op.gte]: new Date(fromDate),
      };
    } else if (toDate) {
      scheduleWhere.DepartureTime = {
        [Op.lte]: new Date(toDate),
      };
    }

    const ScheduleData = await DBMODELS.TripPlanSchedule.findAll({
      where: scheduleWhere,
      include: [
        {
          model: DBMODELS.CustomerMaster,
          as: "CustomerMasters",
          attributes: ["CustId", "CustomerName", "CustCode", "GSTNo"],
        },
        {
          model: DBMODELS.Vehicle,
          as: "Vehicle",
          where: vehicleNo
            ? {
                VNumer: {
                  [Op.like]: `%${vehicleNo}%`,
                },
              }
            : {},
          attributes: ["VehicleID", "VNumer", "FleetZize"],
        },
        {
          model: DBMODELS.Driver,
          as: "Driver",
          attributes: ["DriverID", "DName", "Licence"],
        },
        {
          model: DBMODELS.CustRateMap,
          as: "CustRateMaps",
          // required: true,
          on: {
            RouteId: where(
              col("TripPlanSchedule.RouteId"),
              "=",
              col("CustRateMaps.RouteId")
            ),
            CustId: where(
              col("TripPlanSchedule.CustId"),
              "=",
              col("CustRateMaps.CustId")
            ),
            TripType: where(
              col("TripPlanSchedule.TripType"),
              "=",
              col("CustRateMaps.TripType")
            )
          },
          attributes: [
            "ID",
            "CustId",
            "RouteId",
            "RouteType",
            "TripType",
            "RouteString",
          ],
          include: [
            {
              model: DBMODELS.TripType,
              as: "trip_type",
              required: true,
              attributes: ["Id", "TypeName"],
            },
          ],
        },
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
      order: [["ID", "DESC"]],
    });


    let tripOperationWhere = {};
    if (status !== null && status !== undefined) {
      tripOperationWhere.Stat = status;
    }

    let tripPlanWhere = {};
    if (fromDate && toDate) {
      tripPlanWhere.DepartureTime = {
        [Op.between]: [new Date(fromDate), new Date(toDate)],
      };
    } else if (fromDate) {
      tripPlanWhere.DepartureTime = {
        [Op.gte]: new Date(fromDate),
      };
    } else if (toDate) {
      tripPlanWhere.DepartureTime = {
        [Op.lte]: new Date(toDate),
      };
    }

    const data = await DBMODELS.TripOperation.findAll({
      where: tripOperationWhere,
      // group: ['Id'],
      include: [
        {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          where: tripPlanWhere,
          include: [
            {
              model: DBMODELS.CustomerMaster,
              as: "CustomerMasters",
              attributes: ["CustId", "CustomerName", "CustCode", "GSTNo"],
            },
            {
              model: DBMODELS.Vehicle,
              as: "Vehicle",
              where: vehicleNo
                ? {
                    VNumer: {
                      [Op.like]: `%${vehicleNo}%`,
                    },
                  }
                : {},
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
              model: DBMODELS.CustRateMap,
              as: "CustRateMaps",
              on: literal(
                "`TripPlan`.`RouteId` = `TripPlan->CustRateMaps`.`RouteId` AND `TripPlan`.`CustId` = `TripPlan->CustRateMaps`.`CustId` AND `TripPlan`.`TripType` = `TripPlan->CustRateMaps`.`TripType`"
              ),
              include: [
                {
                  model: DBMODELS.TripType,
                  as: "trip_type",
                  required: true,
                  attributes: ["Id", "TypeName"],
                },
              ],
              attributes: [
                "ID",
                "CustId",
                "RouteId",
                "RouteType",
                "TripType",
                "RouteString",
              ],
            },
          ],
        },
      ],
    });

    const filteredTrips = data.filter((trip) => {
      const tripNo = trip.TripNo;
      const lastLetter = tripNo.slice(-1);

      if (trip.TripPlan.TripType === 2) {
        const tripA = data.find((t) => t?.TripNo === tripNo.slice(0, -1) + "A");
        const tripB = trip;

        if (lastLetter === "A" && trip.Stat !== 7) {
          return true;
        } else if (lastLetter === "B") {
          const correspondingATrip = data.find(
            (t) => t?.TripNo === tripNo.slice(0, -1) + "A" && t?.Stat === 7
          );

          const correspondingATripB = data.find(
            (t) => t?.TripNo === tripNo.slice(0, -1) + "B" && t?.Stat !== 7
          );

          if (correspondingATrip && correspondingATripB) {
            return true;
          } else {
            return false;
          }
        } else if (tripA && tripB && tripA.Stat + tripB.Stat === 14) {
          return false;
        }
      } else {
        return true;
      }
    });

    filteredTrips.forEach((trip) => {
      console.log(">>> : ", trip.Id, trip.TripNo, trip.Stat);
    });

    const mergedArray = ScheduleData.concat(filteredTrips);

    const tripDetailsArray = mergedArray.map((item) => {
      let tripDirection = "";

      if (item.TripPlan) {
        if (item.TripPlan.TripType === 2) {
          if (item.TripNo?.endsWith("B")) {
            tripDirection = "Reverse";
          } else {
            tripDirection = "Forward";
          }
        } else {
          tripDirection = "Forward";
        }
      }

      if (
        item.TripNo &&
        item?.TripPlan?.TripType === 2 &&
        item.TripNo.endsWith("B")
      ) {
        tripDirection = "Reverse";
      }

      if (item.TripPlan) {
        return {
          Id: item.Id,
          TripId: item.TripId,
          TripNo: item.TripNo,
          InvoiceCopy: item.InvoiceCopy,
          LRCopy: item.LRCopy,
          DAV: item.DAV,
          GatePass: item.GatePass,
          POD: item.POD,
          EwayBilNo: item.EwayBilNo,
          ATD: item.ATD,
          CreatedBy: item.CreatedBy,
          CreatedTime: item.CreatedTime,
          ATA: item.ATA,
          AmendReason: item.AmendReason,
          Status: item.Stat,
          StartBy: item.StartBy,
          OnRouteBy: item.OnRouteBy,
          CloseBy: item.CloseBy,
          Is_Invoice: item.Is_Invoice,
          Remark: item.Remark,
          OpeningKm: item.OpeningKm,
          ClosingKm: item.ClosingKm,
          ActualKm: item.ActulaKm,
          CVerify: item.CVerify,
          TripSheetNo: item.TripSheetNo,

          // TripPlan: {
          TripSheet: item.TripPlan.TripSheet,
          VPlaceTime: item.TripPlan.VPlaceTime,
          DepartureTime: item.TripPlan.DepartureTime,
          RouteId: item.TripPlan.RouteId,
          VehicleId: item.TripPlan.VehicleId,
          Driver1Id: item.TripPlan.Driver1Id,
          // Status: item.TripPlan.Status,
          CreatedBy: item.TripPlan.CreatedBy,
          TripTypeName: item.TripPlan.tripType?.TypeName || null,

          CustomerName: item.TripPlan.CustomerMasters?.CustomerName || null,
          CustCode: item.TripPlan.CustomerMasters?.CustCode || null,
          GSTNo: item.TripPlan.CustomerMasters?.GSTNo || null,

          VehicleNumber: item.TripPlan.Vehicle?.VNumer || null,
          FleetSize: item.TripPlan.Vehicle?.FleetZize || null,

          DriverName: item.TripPlan.Driver?.DName || null,
          DriverLicence: item.TripPlan.Driver?.Licence || null,
          RateMapCustId: item.TripPlan.CustRateMaps?.CustId || null,
          RateMapRouteId: item.TripPlan.CustRateMaps?.RouteId || null,
          RateMapRouteType: item.TripPlan.CustRateMaps?.RouteType || null,
          RateMapTripType: item.TripPlan.CustRateMaps?.TripType || null,
          RouteString: item.TripPlan.CustRateMaps?.RouteString || null,
          TripTypeName: item.TripPlan.CustRateMaps?.trip_type?.TypeName || null,
          TripDirection: tripDirection,
          // },
        };
      } else {
        return {
          Id: item.ID,
          TripId: item.TripId || null,
          TripNo: null,
          CustType: item.CustType,
          CustId: item.CustId,
          RouteId: item.RouteId,
          TripType: item.TripType,
          VehicleId: item.VehicleId,
          Driver1Id: item.Driver1Id,
          VPlaceTime: item.VPlaceTime,
          DepartureTime: item.DepartureTime,
          TripSheet: item.TripSheet,
          CreatedBy: item.CreatedBy,
          Status: item.Status,

          CustomerName: item.CustomerMasters?.CustomerName || null,
          CustCode: item.CustomerMasters?.CustCode || null,
          GSTNo: item.CustomerMasters?.GSTNo || null,

          VehicleNumber: item.Vehicle?.VNumer || null,
          FleetSize: item.Vehicle?.FleetZize || null,

          DriverName: item.Driver?.DName || null,
          DriverLicence: item.Driver?.Licence || null,

          RateMapID: item.CustRateMaps?.ID || null,
          RateMapCustId: item.CustRateMaps?.CustId || null,
          RateMapRouteId: item.CustRateMaps?.RouteId || null,
          RateMapRouteType: item.CustRateMaps?.RouteType || null,
          RateMapTripType: item.CustRateMaps?.TripType || null,
          RouteString: item.CustRateMaps?.RouteString || null,
          TripTypeName: item.CustRateMaps?.trip_type?.TypeName || null,
          TripDirection: "",
        };
      }
    });

    if (
      !tripDetailsArray ||
      (Array.isArray(tripDetailsArray) && tripDetailsArray.length === 0)
    ) {
      return res
        .status(404)
        .json({ status: "404", message: "No record found" });
    }

    return res
      .status(200)
      .json({ status: "200", message: "Record found", data: tripDetailsArray });
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

    // Convert to MySQL-compatible format
    const formattedVPlaceTime = moment(VPlaceTime, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const formattedDepartureTime = moment(
      DepartureTime,
      "DD-MM-YYYY HH:mm"
    ).format("YYYY-MM-DD HH:mm:ss");

    const dataModel = {
      CustType,
      CustId,
      RouteId,
      TripType,
      VehicleSize,
      VehicleId,
      Driver1Id,
      Driver2Id,
      VPlaceTime: formattedVPlaceTime,
      DepartureTime: formattedDepartureTime,
      Remark,
      TripSheet,
      StartKm,
      Status: 1, // default
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
    const userId = req.user.userId;
    const { tripId } = req.query;

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

    console.log("Body : ", req.body);

    // Validate required fields
    if (!tripId) {
      return res.status(400).json({
        status: "400",
        message: "TripId is missing",
      });
    }

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
      !TripSheet
    ) {
      return res.status(400).json({
        status: "400",
        message: "Missing required fields",
      });
    }

    // Format date/time fields
    const formattedVPlaceTime = moment(VPlaceTime, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const formattedDepartureTime = moment(
      DepartureTime,
      "DD-MM-YYYY HH:mm"
    ).format("YYYY-MM-DD HH:mm:ss");

    // Build update object
    const updateFields = {
      CustType,
      CustId,
      RouteId,
      TripType,
      VehicleSize,
      VehicleId,
      Driver1Id,
      Driver2Id: Driver2Id || null,
      VPlaceTime: formattedVPlaceTime,
      DepartureTime: formattedDepartureTime,
      Remark: Remark || null,
      // TripSheet,
      StartKm,
      UpdatedBy: userId,
      UpdatedAt: new Date(), // Optional: if you want to keep a timestamp
    };

    console.log("updateFields : ", updateFields);

    const [updatedRows] = await DBMODELS.TripPlanSchedule.update(updateFields, {
      where: { ID: tripId },
    });

    if (updatedRows === 0) {
      return res.status(404).json({
        status: "404",
        message: "Record not found or nothing to update",
      });
    }

    return res.status(200).json({
      status: "200",
      message: "Record updated successfully",
      updatedRows,
    });
  } catch (error) {
    console.log("Error while updating trip:", error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
    });
  }
};

module.exports.cancelTrip = async (req, res) => {
  try {
    const { tripId = null } = req.body || {};

    const TripId = parseInt(tripId);
    console.log("TripId : ", TripId, typeof TripId);

    if (!TripId) {
      return res
        .status(400)
        .json({ status: "400", message: "tripId or status missing" });
    }

    // Check if the status is already the same
    const existingTripPlanSchedule = await DBMODELS.TripPlanSchedule.findOne({
      where: { ID: TripId },
    });

    if (!existingTripPlanSchedule) {
      return res
        .status(404)
        .json({ status: "404", message: "no record found" });
    }

    const [updatedTripPlanScheduleRows] =
      await DBMODELS.TripPlanSchedule.update(
        { Status: 6 },
        { where: { ID: TripId } }
      );

    if (updatedTripPlanScheduleRows === 0) {
      return res.status(404).json({
        status: "404",
        message: "Already Cancled",
      });
    }

    return res.status(201).json({
      status: "201",
      message: "trip cancled successfully",
      updatedTripPlanScheduleRows,
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
    const { tripId = null } = req.body || {};

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
      // updatedTripPlanSchedule: tripScheduleData,
      // addedTripPlan: tripPlanData,
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

module.exports.onRouteTripDetails = async (req, res) => {
  try {
    const { tripId, tripNo } = req.query;
    const {
      TAT = null,
      TENT_KMs = null,
      Act_Dept = null,
      OpeningKm = null,
      CustId = null,
    } = req.body || {};

    if (!tripId || !tripNo) {
      return res.status(400).json({
        status: "400",
        message: "Missing tripId or tripNo",
      });
    }

    if (!Act_Dept || !OpeningKm || !CustId) {
      return res.status(400).json({
        status: "400",
        message: "Missing Act_Dept or OpeningKm CustId",
      });
    }

    const formattedActualTime = moment(Act_Dept, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );
   console.log(tripId);
   console.log(tripNo);
    const existTrip = await DBMODELS.TripOperation.findOne({
      where: {
        TripId: tripId,
        TripNo: tripNo,
      },
    });
  console.log(existTrip);
    if (!existTrip) {
      return res.status(404).json({
        status: "404",
        message: "Record not found with this customer",
      });
    }

    const [updatedRows] = await DBMODELS.TripOperation.update(
      {
        ATD: formattedActualTime,
        OpeningKm: OpeningKm,
        // TAT: TAT,
        // TENT_KMs: TENT_KMs,
        Stat: 4,
      },
      {
        where: {
          TripId: tripId,
          TripNo: tripNo,
        },
      }
    );

    if (updatedRows === 0) {
      return res
        .status(404)
        .json({ status: "404", message: "No records updated" });
    }

    return res.status(200).json({
      status: "200",
      message: "Trip details updated successfully",
      updatedRows: updatedRows,
    });
  } catch (error) {
    console.log("Error while onRoute trip update:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

module.exports.closeTripDetails = async (req, res) => {
  try {
    const { tripId, tripNo } = req.query;
    const {
      Act_Dept = null,
      Act_Arr = null,
      OpeningKm = null,
      ClosingKm = null,
      ActualKm = null,
    } = req.body || {};

    if (!tripId || !tripNo) {
      return res.status(400).json({
        status: "400",
        message: "Missing tripId or tripNo",
      });
    }

    if (!Act_Dept || !Act_Arr || !OpeningKm || !ClosingKm || !ActualKm) {
      return res
        .status(400)
        .json({ status: "400", message: "required fields are missing" });
    }

    const existTrip = await DBMODELS.TripOperation.findOne({
      where: {
        TripId: tripId,
      },
    });

    if (!existTrip) {
      return res
        .status(404)
        .json({ status: "404", message: "Record not found" });
    }

    const formattedActualArr = moment(Act_Arr, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const formattedActualDEPT = moment(Act_Dept, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );

    const [updatedRows] = await DBMODELS.TripOperation.update(
      {
        ATD: formattedActualDEPT,
        ATA: formattedActualArr,
        OpeningKm: OpeningKm,
        ClosingKm: ClosingKm,
        ActulaKm: ActualKm,
        Stat: 7,
      },
      {
        where: {
          TripId: tripId,
          TripNo: tripNo,
        },
      }
    );

    if (updatedRows === 0) {
      return res
        .status(404)
        .json({ status: "404", message: "Already updated" });
    }

    return res.status(200).json({
      status: "200",
      message: "Trip details updated successfully",
      updatedRows: updatedRows,
    });
  } catch (error) {
    console.log("Error while close trip:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

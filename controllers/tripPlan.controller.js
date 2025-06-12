const { where, col, Op } = require("sequelize");
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

    const whereClause = {};

    if (vehicleNo) {
      whereClause["$TripPlan.Vehicle.VNumer$"] = {
        [Op.like]: `%${vehicleNo}%`,
      };
    }

    if (status !== null) {
      whereClause["Stat"] = status;
    }

    if (fromDate && toDate) {
      whereClause["$TripPlan.DepartureTime$"] = {
        [Op.between]: [new Date(fromDate), new Date(toDate)],
      };
    } else if (fromDate) {
      whereClause["$TripPlan.DepartureTime$"] = {
        [Op.gte]: new Date(fromDate),
      };
    } else if (toDate) {
      whereClause["$TripPlan.DepartureTime$"] = {
        [Op.lte]: new Date(toDate),
      };
    }

    console.log("Where : ", whereClause);
    const ScheduleData = await DBMODELS.TripPlanSchedule.findAll({
      where: {
        [Op.and]: [{ is_final: 0 }, { Status: { [Op.ne]: 6 } }],
      },
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
          model: DBMODELS.CustRateMap,
          as: "CustRateMaps",
          // required: true,
          // where: where( // for show only RT trip if trip type is 2 remove OW trip
          //   col("CustRateMaps.TripType"),
          //   col("TripPlanSchedule.TripType")
          // ),
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
              model: DBMODELS.CustRateMap,
              as: "CustRateMaps",
              // required: true,
              // where: where( // for show only RT trip if trip type is 2 remove OW trip
              //   col("CustRateMaps.TripType"),
              //   col("TripPlanSchedule.TripType")
              // ),
              // on: {
              //   RouteId: where(
              //     col("TripPlanSchedule.RouteId"),
              //     "=",
              //     col("CustRateMaps.RouteId")
              //   ),
              //   CustId: where(
              //     col("TripPlanSchedule.CustId"),
              //     "=",
              //     col("CustRateMaps.CustId")
              //   ),
              // },
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

            // {
            //   model: DBMODELS.TripType,
            //   as: "tripType",
            //   // attributes: ["Id", "TypeName"],
            // },
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
            (t) => t?.TripNo === tripNo.slice(0, -1) + "A" && t?.Stat === 7
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

    const mergedArray = ScheduleData.concat(filteredTrips);

    const tripDetailsArray = mergedArray.map((item) => {
      if (item.TripPlan) {
        return {
          Id: item.TripId,
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
          // },
        };
      } else {
        return {
          Id: item.ID,
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
    const formattedVPlaceTime = moment(
      VPlaceTime,
      "DD-MM-YYYY HH:mm"
    ).format("YYYY-MM-DD HH:mm:ss");
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

    const existTrip = await DBMODELS.TripOperation.findOne({
      where: {
        TripId: tripId,
      },
      include: [
        {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          where: {
            CustId: CustId,
          },
        },
      ],
    });

    if (!existTrip) {
      return res.status(404).json({
        status: "404",
        message: "Record not found with this customer",
      });
    }

    const [updatedRows] = await DBMODELS.TripOperation.update(
      {
        ATD: Act_Dept,
        OpeningKm: OpeningKm,
        // TAT: TAT,
        // TENT_KMs: TENT_KMs
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
    console.error("Error while onRoute trip update:", error);
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

    const [updatedRows] = await DBMODELS.TripOperation.update(
      {
        ATD: Act_Dept,
        ATA: Act_Arr,
        OpeningKm: OpeningKm,
        ClosingKm: ClosingKm,
        ActulaKm: ActualKm,
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
    console.error("Error while close trip:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

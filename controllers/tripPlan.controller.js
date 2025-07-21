const { where, col, Op, literal } = require("sequelize");
const { DBMODELS } = require("../models/init-models");
const moment = require("moment");
const PlanCat = require("../models/PlanCat");

module.exports.checkTripPlan = async (req, res) => {
  try {
    const {
      vehicleNo = null,
      status = null,
      fromDate = null,
      toDate = null,
    } = req.body || {};

    console.log("Request body:", req.body);

    let scheduleWhere = {
      is_final: 0,
    };

    if (status !== null) {
      scheduleWhere.Status = {
        [Op.and]: [{ [Op.eq]: status }, { [Op.ne]: 6 }],
      };
    } else {
      scheduleWhere.Status = {
        [Op.ne]: 6,
      };
    }

    if (vehicleNo !== null) {
      scheduleWhere[Op.or] = [
        { TripSheet: { [Op.like]: `%${vehicleNo}%` } },
        { "$Vehicle.VNumer$": { [Op.like]: `%${vehicleNo}%` } },
      ];
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

    const ScheduleDatafromRouteMaster = await DBMODELS.TripPlanSchedule.findAll(
      {
        where: {
          ...scheduleWhere,
          PlanCat: 2,
        },
        include: [
          {
            model: DBMODELS.MarketCust,
            as: "MarketCust",
            // attributes: ["CustId", "CustomerName", "CustCode", "GSTNo"],
          },
          {
            model: DBMODELS.Vehicle,
            as: "Vehicle",
            // where: vehicleNo
            //   ? {
            //       VNumer: {
            //         [Op.like]: `%${vehicleNo}%`,
            //       },
            //     }
            //   : {},
            attributes: ["VehicleID", "VNumer", "FleetZize"],
          },
          {
            model: DBMODELS.Driver,
            as: "Driver",
            attributes: ["DriverID", "DName", "Licence"],
          },
          {
            model: DBMODELS.RouteMaster,
            as: "Route_Master",
            // required: true,
            on: {
              RouteId: where(
                col("TripPlanSchedule.RouteId"),
                "=",
                col("Route_Master.RouteId")
              ),
              // CustId: where(
              //   col("TripPlanSchedule.CustId"),
              //   "=",
              //   col("Route_Master.CustId")
              // ),
            },
            include: [
              {
                model: DBMODELS.city,
                as: "source_city",
                attributes: ["CityId", "CityName", "latitude", "longitude"],
              },
              {
                model: DBMODELS.city,
                as: "dest_city",
                attributes: ["CityId", "CityName", "latitude", "longitude"],
              },
            ],
            // attributes: ["RouteId", "RouteName", "RouteType", "RouteString"],
          },
          {
            model: DBMODELS.TripType,
            as: "tripType",
            attributes: ["Id", "TypeName"],
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
          "StartKm",
          "Remark",
          "PlanCat",
        ],
        order: [["ID", "DESC"]],
      }
    );

    console.log(
      "ScheduleDatafromRouteMaster.lengthg : ",
      ScheduleDatafromRouteMaster.length
    );

    const ScheduleDatafromCustRateMAps =
      await DBMODELS.TripPlanSchedule.findAll({
        where: {
          ...scheduleWhere,
          PlanCat: {
            [Op.ne]: 2,
          },
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
            model: DBMODELS.RouteMaster,
            as: "Route_Master",
            attributes: ["RouteId"],
            include: [
              {
                model: DBMODELS.city,
                as: "source_city",
                attributes: ["CityId", "CityName", "latitude", "longitude"],
              },
              {
                model: DBMODELS.city,
                as: "dest_city",
                attributes: ["CityId", "CityName", "latitude", "longitude"],
              },
            ],
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
          "StartKm",
          "Remark",
          "PlanCat",
        ],
        order: [["ID", "DESC"]],
      });

    console.log(
      "ScheduleDatafromCustRateMAps.length : ",
      ScheduleDatafromCustRateMAps.length
    );

    let tripOperationWhere = {};
    if (status !== null && status !== undefined && status !== 1) {
      tripOperationWhere.Stat = {
        [Op.eq]: status,
        [Op.ne]: 6,
      };
    } else {
      tripOperationWhere.Stat = {
        [Op.ne]: 6,
      };
    }

    let tripPlanWhere = {};

    if (status !== null && status !== undefined) {
      tripPlanWhere.Status = status;
    }

    if (vehicleNo !== null) {
      tripOperationWhere[Op.or] = [
        { "$TripPlan.TripSheet$": { [Op.like]: `%${vehicleNo}%` } },
        { "$TripPlan.Vehicle.VNumer$": { [Op.like]: `%${vehicleNo}%` } },
      ];
    }
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

    const regularData = await DBMODELS.TripOperation.findAll({
      where: tripOperationWhere,
      include: [
        {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          where: {
            ...tripPlanWhere,
            PlanCat: {
              [Op.ne]: 2,
            },
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
              model: DBMODELS.RouteMaster,
              as: "route_master",
              attributes: ["RouteId"],
              include: [
                {
                  model: DBMODELS.city,
                  as: "source_city",
                  attributes: ["CityId", "CityName", "latitude", "longitude"],
                },
                {
                  model: DBMODELS.city,
                  as: "dest_city",
                  attributes: ["CityId", "CityName", "latitude", "longitude"],
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

    console.log("Regular.length : ", regularData.length);

    const marketData = await DBMODELS.TripOperation.findAll({
      where: tripOperationWhere,
      // group: ['Id'],
      include: [
        {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          where: { ...tripPlanWhere, PlanCat: 2 },
          include: [
            {
              model: DBMODELS.MarketCust,
              as: "MarketCust",
              // attributes: ["CustId", "CustomerName", "CustCode", "GSTNo"],
            },
            {
              model: DBMODELS.Vehicle,
              as: "Vehicle",
              // where: vehicleNo
              //   ? {
              //       VNumer: {
              //         [Op.like]: `%${vehicleNo}%`,
              //       },
              //     }
              //   : {},
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
              required: true,
              // on: {
              //   RouteId: where(
              //     col("TripPlan.RouteId"),
              //     "=",
              //     col("route_master.RouteId")
              //   ),
              //   // CustId: where(
              //   //   col("TripPlan.CustId"),
              //   //   "=",
              //   //   col("route_master.CustId")
              //   // ),
              // },
              include: [
                {
                  model: DBMODELS.city,
                  as: "source_city",
                  attributes: ["CityId", "CityName", "latitude", "longitude"],
                },
                {
                  model: DBMODELS.city,
                  as: "dest_city",
                  attributes: ["CityId", "CityName", "latitude", "longitude"],
                },
              ],
              // attributes: ["RouteId", "RouteName", "RouteType", "RouteString"],
            },
            {
              model: DBMODELS.TripType,
              as: "tripType",
              required: true,
              attributes: ["Id", "TypeName"],
            },
            // {
            //   model: DBMODELS.CustRateMap,
            //   as: "CustRateMaps",
            //   on: literal(
            //     "`TripPlan`.`RouteId` = `TripPlan->CustRateMaps`.`RouteId` AND `TripPlan`.`CustId` = `TripPlan->CustRateMaps`.`CustId` AND `TripPlan`.`TripType` = `TripPlan->CustRateMaps`.`TripType`"
            //   ),
            //   include: [
            //     {
            //       model: DBMODELS.TripType,
            //       as: "trip_type",
            //       required: true,
            //       attributes: ["Id", "TypeName"],
            //     },
            //   ],
            //   attributes: [
            //     "ID",
            //     "CustId",
            //     "RouteId",
            //     "RouteType",
            //     "TripType",
            //     "RouteString",
            //   ],
            // },
          ],
        },
      ],
    });

    console.log("Regular.length : ", regularData.length);
    console.log("Market.length : ", marketData.length);

    const data = [...regularData, ...marketData];

    const tripMap = new Map(data.map((t) => [t.TripNo, t]));

    const filteredTrips = data.filter((trip) => {
      const tripNo = trip.TripNo;
      const baseTripNo = tripNo.slice(0, -1);
      const lastLetter = tripNo.slice(-1);
      const tripType = trip.TripPlan?.TripType;

      if (tripType === 2) {
        if (lastLetter === "A" && trip.Stat !== 7) {
          return true;
        }

        if (lastLetter === "B") {
          const correspondingATrip = tripMap.get(baseTripNo + "A");
          const correspondingBTrip = tripMap.get(baseTripNo + "B");

          if (
            correspondingATrip?.Stat === 7 &&
            correspondingBTrip?.Stat !== 7
          ) {
            return true;
          }

          if (
            correspondingATrip &&
            correspondingBTrip &&
            correspondingATrip.Stat + correspondingBTrip.Stat === 14
          ) {
            return false;
          }
        }

        return false;
      } else {
        return lastLetter === "A" && trip.Stat !== 7;
      }
    });

    // const filteredTrips = data.filter((trip) => {
    //   const tripNo = trip.TripNo;
    //   const lastLetter = tripNo.slice(-1);

    //   if (trip.TripPlan.TripType === 2) {
    //     const tripA = data.find((t) => t?.TripNo === tripNo.slice(0, -1) + "A");
    //     const tripB = trip;

    //     if (lastLetter === "A" && trip.Stat !== 7) {
    //       return true;
    //     } else if (lastLetter === "B") {
    //       const correspondingATrip = data.find(
    //         (t) => t?.TripNo === tripNo.slice(0, -1) + "A" && t?.Stat === 7
    //       );

    //       const correspondingATripB = data.find(
    //         (t) => t?.TripNo === tripNo.slice(0, -1) + "B" && t?.Stat !== 7
    //       );

    //       if (correspondingATrip && correspondingATripB) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     } else if (tripA && tripB && tripA.Stat + tripB.Stat === 14) {
    //       return false;
    //     }
    //   } else {
    //     if (lastLetter === "A" && trip.Stat !== 7) {
    //       // console.log("yee: ",trip.TripNo, trip.Stat)
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
    // });

    // console.log("ScheduleDatafromRouteMaster : ",ScheduleDatafromRouteMaster[0].Route_Master)

    const ScheduleData = [
      ...ScheduleDatafromRouteMaster,
      ...ScheduleDatafromCustRateMAps,
    ];

    const mergedArray = ScheduleData.concat(filteredTrips);

    console.log("Merged Array length:", mergedArray.length);

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
        if (item.TripPlan.PlanCat === 2) {
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
            StartKm: item.StartKm || null,
            Remark: item.Remark || null,
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
            PlanCat: item.TripPlan.PlanCat,
            CreatedBy: item.TripPlan.CreatedBy,
            TripTypeName: item.TripPlan.tripType?.TypeName || null,

            CustomerName: item.TripPlan.MarketCust?.Name || null,
            CustCode: item.TripPlan.MarketCust?.Phone || null,
            GSTNo: item.TripPlan.CustomerMasters?.GSTNo || null,

            VehicleNumber: item.TripPlan.Vehicle?.VNumer || null,
            FleetSize: item.TripPlan.Vehicle?.FleetZize || null,

            DriverName: item.TripPlan.Driver?.DName || null,
            DriverLicence: item.TripPlan.Driver?.Licence || null,
            RateMapCustId: item.TripPlan.route_master?.CustId || null,
            RateMapRouteId: item.TripPlan.route_master?.RouteId || null,
            RateMapRouteType: item.TripPlan.CustRateMaps?.RouteType || null,
            RateMapTripType: item.TripPlan.CustRateMaps?.TripType || null,
            RouteString:
              `${item.TripPlan.route_master.source_city.CityName}-${item.TripPlan.route_master.dest_city.CityName}` ||
              null,
            TripTypeName: item.TripPlan.tripType?.TypeName || null,
            TripDirection: tripDirection,
            source: item.TripPlan.route_master.source_city.CityId,
            destination: item.TripPlan.route_master.dest_city.CityId,
            sourceName: item.TripPlan.route_master.source_city.CityName,
            destinationName: item.TripPlan.route_master.dest_city.CityName,
            // },
          };
        } else {
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
            StartKm: item.StartKm || null,
            Remark: item.Remark || null,
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
            PlanCat: item.TripPlan.PlanCat,
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
            TripTypeName:
              item.TripPlan.CustRateMaps?.trip_type?.TypeName || null,
            TripDirection: tripDirection,
            source: item?.TripPlan.route_master?.source_city.CityId,
            destination: item?.TripPlan.route_master?.dest_city.CityId,
            sourceName: item.TripPlan.route_master.source_city.CityName,
            destinationName: item.TripPlan.route_master.dest_city.CityName,
            // },
          };
        }
      } else {
        if (item.PlanCat === 2) {
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
            StartKm: item.StartKm,
            Remark: item.Remark,
            PlanCat: item.PlanCat,
            CustomerName: item.MarketCust?.Name || null,
            CustCode: item.MarketCust?.CustCode || null,
            GSTNo: item.MarketCust?.GSTNo || null,

            VehicleNumber: item.Vehicle?.VNumer || null,
            FleetSize: item.Vehicle?.FleetZize || null,

            DriverName: item.Driver?.DName || null,
            DriverLicence: item.Driver?.Licence || null,

            RateMapID: item.Route_Master?.RouteId || null,
            RateMapCustId: item.Route_Master?.CustId || null,
            RateMapRouteId: item.Route_Master?.RouteId || null,
            RateMapRouteType: item.Route_Master?.RouteType || null,
            RateMapTripType: item.CustRateMaps?.TripType || null,
            RouteString:
              `${item?.Route_Master?.source_city?.CityName}-${item?.Route_Master?.dest_city?.CityName}` ||
              null,
            TripTypeName: item.tripType?.TypeName || null,
            TripDirection: item.TripType === 2 ? "Reverse" : "Forward",
            source: item?.Route_Master?.source_city?.CityId,
            destination: item?.Route_Master?.dest_city?.CityId,
            sourceName: item.Route_Master.source_city.CityName,
            destinationName: item.Route_Master.dest_city.CityName,
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
            StartKm: item.StartKm,
            Remark: item.Remark,
            PlanCat: item.PlanCat,
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
            TripDirection: item.TripType === 2 ? "Reverse" : "Forward",
            source: item?.Route_Master?.source_city?.CityId,
            destination: item?.Route_Master?.dest_city?.CityId,
            sourceName: item.Route_Master.source_city.CityName,
            destinationName: item.Route_Master.dest_city.CityName,
          };
        }
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
    console.log("Trip Details Array length:", tripDetailsArray.length);

    return res
      .status(200)
      .json({ status: "200", message: "Record found", data: tripDetailsArray });
  } catch (error) {
    console.log("Error while fetching trip operations:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

module.exports.tripPlan = async (req, res) => {
  try {
    const userId = req.user.userId;

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
      PlanCat: 1,
    };

    // console.log("Data : ", dataModel);

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

    console.log("Error While creating tripSheet:", error);

    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

module.exports.updateTrip = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { tripId, PlanCat } = req.query;

    const {
      CustType,
      CustId,
      source,
      destination,
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
    if (!tripId || !PlanCat) {
      return res.status(400).json({
        status: "400",
        message: "TripId or PlanCat is missing",
      });
    }

    if (PlanCat === "2") {
      // Validate the required fields for PlanCat 2
      if (
        !CustType ||
        !CustId ||
        !source ||
        !destination ||
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
          message: "Missing required fields in plan Cat 2",
        });
      }

      // Validate source and destination as integers (City IDs)
      if (!Number.isInteger(source) || !Number.isInteger(destination)) {
        return res
          .status(400)
          .json({ message: "Source or Destination must be valid CityIds" });
      }

      // Format date/time fields
      const formattedVPlaceTime = moment(VPlaceTime, "DD-MM-YYYY HH:mm").format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const formattedDepartureTime = moment(
        DepartureTime,
        "DD-MM-YYYY HH:mm"
      ).format("YYYY-MM-DD HH:mm:ss");

      // Check if source and destination are valid cities
      const checkSource = await DBMODELS.city.findOne({
        where: { CityId: source },
      });
      const checkDest = await DBMODELS.city.findOne({
        where: { CityId: destination },
      });

      if (!checkSource || !checkDest) {
        return res
          .status(400)
          .json({ message: "Invalid source or destination city ID" });
      }

      const SourceName = checkSource.CityName;
      const DestName = checkDest.CityName;

      let RouteID;
      // Check if the route already exists
      const routes = await DBMODELS.RouteMaster.findAll({
        where: { Source: source, Destination: destination },
        include: [
          { model: DBMODELS.city, as: "source_city" },
          { model: DBMODELS.city, as: "dest_city" },
        ],
      });

      if (routes.length > 0) {
        RouteID = routes[0].RouteId;
      } else {
        // Create a new route if not found
        const newRoute = await DBMODELS.RouteMaster.create({
          CustId: CustId,
          RouteCode: `${SourceName.slice(0, 2)}-${DestName.slice(0, 2)}`,
          Source: source,
          Destination: destination,
          Distance: 0,
          CreatedBy: req.user?.userId,
          RouteCat: 1,
          is_active: 1,
        });

        RouteID = newRoute.RouteId;
      }

      const updateFields = {
        CustType,
        CustId,
        RouteId: RouteID,
        TripType,
        VehicleSize,
        VehicleId,
        Driver1Id,
        Driver2Id: Driver2Id || null,
        VPlaceTime: formattedVPlaceTime,
        DepartureTime: formattedDepartureTime,
        Remark: Remark || null,
        // TripSheet: TripSheet || null,
        StartKm,
        UpdatedBy: userId,
        UpdatedAt: new Date(),
      };

      console.log("updateFields paln CAt 2 : ", updateFields);

      const [updatedRows] = await DBMODELS.TripPlanSchedule.update(
        updateFields,
        { where: { ID: tripId } }
      );

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
        updatedTrip: updateFields,
      });
    } else {
      // Validate fields for PlanCat !== 2
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
          message: "Missing required fields not 2",
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
        // TripSheet: TripSheet || null,
        StartKm,
        UpdatedBy: userId,
        UpdatedAt: new Date(),
      };

      console.log("updateFieldsPlanCat not 2  : ", updateFields);

      const [updatedRows] = await DBMODELS.TripPlanSchedule.update(
        updateFields,
        { where: { ID: tripId } }
      );

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
        updatedTrip: updateFields,
      });
    }
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
    console.log("Error While updating trip:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

module.exports.proceedTrip = async (req, res) => {
  try {
    const { tripId = null } = req.body || {};

    if (!tripId) {
      console.log("Missing tripId");
      return res.status(400).json({ status: "400", message: "Missing tripId" });
    }

    const isExist = await DBMODELS.TripPlanSchedule.findOne({
      where: { ID: tripId },
    });

    if (!isExist) {
      console.log("Trip does not exist :", tripId);
      return res
        .status(400)
        .json({ status: "400", message: "Trip does not exist" });
    }

    const [updatedRows] = await DBMODELS.TripPlanSchedule.update(
      { is_final: 1 },
      { where: { ID: tripId } }
    );

    if (updatedRows === 0) {
      console.log("No records updated, status might already be the same");
      return res.status(404).json({
        status: "404",
        message: "No records updated, status might already be the same",
      });
    }

    const tripScheduleData = await DBMODELS.TripPlanSchedule.findOne({
      where: { ID: tripId },
    });

    if (!tripScheduleData) {
      console.log("Record not found after update");
      return res.status(404).json({
        status: "404",
        message: "Record not found after update",
      });
    }

    const custType = tripScheduleData.CustType;

    const tripPlanData = await DBMODELS.TripPlan.create({
      ...tripScheduleData.toJSON(),
      Status: 0,
    });

    return res.status(201).json({
      status: "201",
      message: `Trip proceeded`,
      // updatedTripPlanSchedule: tripScheduleData,
      // addedTripPlan: tripPlanData,
    });
  } catch (error) {
    console.log("Error while proceeding trip:", error);
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
    console.log("Error while fetching trip operations:", error);
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
    // console.log(tripId);
    // console.log(tripNo);
    const existTrip = await DBMODELS.TripOperation.findOne({
      where: {
        TripId: tripId,
        TripNo: tripNo,
      },
    });
    // console.log(existTrip);
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

    const tripExist = await DBMODELS.TripPlan.findAll({
      where: {
        ID: tripId,
      },
    });
    if (!tripExist) {
      return res
        .status(404)
        .json({ status: "404", message: "Trip not found in tripPlan" });
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

    const UpdateTripPlanCompletion = await DBMODELS.TripOperation.findAll({
      where: {
        TripId: tripId,
      },
      include: [{ model: DBMODELS.TripPlan, as: "TripPlan" }],
    });

    for (const trip of UpdateTripPlanCompletion) {
      const tripNo = trip.TripNo || "";
      const baseTripNo = tripNo.slice(0, -1);
      const lastLetter = tripNo.slice(-1);
      const tripType = trip?.TripPlan?.TripType;

      if (tripType === 2 && lastLetter === "A" && trip.Stat === 7) {
        // Look for corresponding B part
        const tripB = UpdateTripPlanCompletion.find(
          (t) => t?.TripNo === baseTripNo + "B" && t.Stat === 7
        );

        if (tripB) {
          await DBMODELS.TripPlan.update(
            { Is_Completed: 1 },
            { where: { ID: trip.TripPlan.ID } }
          );
          console.log(
            `TripPlan ${trip.TripPlan.ID} marked completed (Type 2 A+B).`
          );
        }
      }

      if (tripType === 1 && lastLetter === "A" && trip.Stat === 7) {
        await DBMODELS.TripPlan.update(
          { Is_Completed: 1 },
          { where: { ID: trip.TripPlan.ID } }
        );
        console.log(
          `TripPlan ${trip.TripPlan.ID} marked completed (Type 1 A only).`
        );
      }
    }

    if (updatedRows === 0) {
      return res
        .status(404)
        .json({ status: "404", message: "Already updated" });
    }

    return res.status(200).json({
      status: "200",
      message: "Trip details updated successfully",
      UpdateTripPlanCompletion: UpdateTripPlanCompletion,
    });
  } catch (error) {
    console.log("Error while close trip:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

module.exports.marketTripPlan = async (req, res) => {
  const userId = req.user.userId;
  const {
    CustType,
    CustId,
    source,
    destination,
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

  console.log(req.body);
  if (!CustId) {
    return res.status(400).json({ message: "customerId is required" });
  }

  if (
    !CustType ||
    !CustId ||
    !source ||
    !destination ||
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

  const formattedVPlaceTime = moment(VPlaceTime, "DD-MM-YYYY HH:mm").format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const formattedDepartureTime = moment(
    DepartureTime,
    "DD-MM-YYYY HH:mm"
  ).format("YYYY-MM-DD HH:mm:ss");

  const checkSource = await DBMODELS.city.findOne({
    where: {
      CityId: source,
    },
  });

  const checkDest = await DBMODELS.city.findOne({
    where: {
      CityId: destination,
    },
  });

  if (!checkSource || !checkDest) {
    return res
      .status(400)
      .json({ message: "Invalid source or destination city ID" });
  }

  const SourceName = checkSource.CityName;
  const DestName = checkDest.CityName;

  let RouteID;
  try {
    const routes = await DBMODELS.RouteMaster.findAll({
      where: {
        Source: source,
        Destination: destination,
      },
      include: [
        {
          model: DBMODELS.city,
          as: "source_city",
        },
        {
          model: DBMODELS.city,
          as: "dest_city",
        },
      ],
    });

    if (routes.length > 0) {
      // console.log("routes : ", routes);
      RouteID = routes[0].RouteId;
    } else {
      const newRoute = await DBMODELS.RouteMaster.create({
        CustId: CustId,
        RouteCode: `${SourceName.slice(0, 2)}-${DestName.slice(0, 2)}`,
        Source: source,
        Destination: destination,
        Distance: 0,
        CreatedBy: req.user?.userId,
        RouteCat: 1,
        is_active: 1,
      });

      const createdRoute = await DBMODELS.RouteMaster.findOne({
        where: { RouteId: newRoute.RouteId },
        include: [
          {
            model: DBMODELS.city,
            as: "source_city",
          },
          {
            model: DBMODELS.city,
            as: "dest_city",
          },
        ],
      });

      // console.log("createdRoute : ", createdRoute);
      RouteID = createdRoute.RouteId;
    }

    const dataModel = {
      CustType,
      CustId,
      RouteId: RouteID,
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
      PlanCat: 2,
    };

    // console.log("Data : ", dataModel);

    const data = await DBMODELS.TripPlanSchedule.create(dataModel);

    return res
      .status(201)
      .json({ status: "201", message: "Record saved successfully" });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        status: "409",
        message: "tripsheet already exit",
      });
    }
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports.closedTrips = async (req, res) => {
  try {
    const { vehicleNo = null, fromDate = null, toDate = null } = req.body || {};

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

    const regularData = await DBMODELS.TripOperation.findAll({
      // where: tripOperationWhere,
      // attributes:['Id','TripNo','TripId','Stat'],
      include: [
        {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          where: {
            ...tripPlanWhere,
            PlanCat: {
              [Op.ne]: 2,
            },
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

    const marketData = await DBMODELS.TripOperation.findAll({
      // where: tripOperationWhere,
      // group: ['Id'],
      include: [
        {
          model: DBMODELS.TripPlan,
          as: "TripPlan",
          where: { ...tripPlanWhere, PlanCat: 2 },
          include: [
            {
              model: DBMODELS.MarketCust,
              as: "MarketCust",
              // attributes: ["CustId", "CustomerName", "CustCode", "GSTNo"],
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
              required: true,
              // on: {
              //   RouteId: where(
              //     col("TripPlan.RouteId"),
              //     "=",
              //     col("route_master.RouteId")
              //   ),
              //   // CustId: where(
              //   //   col("TripPlan.CustId"),
              //   //   "=",
              //   //   col("route_master.CustId")
              //   // ),
              // },
              include: [
                {
                  model: DBMODELS.city,
                  as: "source_city",
                  attributes: ["CityId", "CityName", "latitude", "longitude"],
                },
                {
                  model: DBMODELS.city,
                  as: "dest_city",
                  attributes: ["CityId", "CityName", "latitude", "longitude"],
                },
              ],
              // attributes: ["RouteId", "RouteName", "RouteType", "RouteString"],
            },
            {
              model: DBMODELS.TripType,
              as: "tripType",
              required: true,
              attributes: ["Id", "TypeName"],
            },
            // {
            //   model: DBMODELS.CustRateMap,
            //   as: "CustRateMaps",
            //   on: literal(
            //     "`TripPlan`.`RouteId` = `TripPlan->CustRateMaps`.`RouteId` AND `TripPlan`.`CustId` = `TripPlan->CustRateMaps`.`CustId` AND `TripPlan`.`TripType` = `TripPlan->CustRateMaps`.`TripType`"
            //   ),
            //   include: [
            //     {
            //       model: DBMODELS.TripType,
            //       as: "trip_type",
            //       required: true,
            //       attributes: ["Id", "TypeName"],
            //     },
            //   ],
            //   attributes: [
            //     "ID",
            //     "CustId",
            //     "RouteId",
            //     "RouteType",
            //     "TripType",
            //     "RouteString",
            //   ],
            // },
          ],
        },
      ],
    });

    console.log("regularData : ", regularData.length);
    console.log("marketData : ", marketData.length);

    const data = [...regularData, ...marketData];

    const filteredClosed = data.filter((trip) => {
      const tripNo = trip.TripNo;
      const lastLetter = tripNo.slice(-1);
      const isClosed = trip.Stat === 7;

      if (trip.TripPlan.TripType === 2) {
        if (lastLetter === "A" && isClosed) {
          const baseTripNo = tripNo.slice(0, -1);

          const tripA = data.find(
            (t) => t?.TripNo === baseTripNo + "A" && t?.Stat === 7
          );
          const tripB = data.find(
            (t) => t?.TripNo === baseTripNo + "B" && t?.Stat === 7
          );

          return tripA && tripB;
        }
        return false;
      }

      if (trip.TripPlan.TripType === 1) {
        return lastLetter === "A" && isClosed;
      }

      return false;
    });

    filteredClosed.forEach((item) => {
      console.log(
        `Id: ${item.Id}, tripId: ${item.TripId} Processing TripNo: ${item.TripNo}, Stat: ${item.Stat}, TripType: ${item.TripPlan.TripType}`
      );
    });

    return res
      .status(200)
      .json({ status: "200", message: "Record found", data: filteredClosed });
  } catch (error) {
    console.log("Error while fetching trip operations:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

module.exports.getTripHistory = async (req, res) => {
  try {
    const { vehicleNo = null, fromDate = null, toDate = null } = req.body || {};

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

    if (vehicleNo) {
      tripPlanWhere[Op.or] = [
        { TripSheet: { [Op.like]: `%${vehicleNo}%` } },
        { "$Vehicle.VNumer$": { [Op.like]: `%${vehicleNo}%` } },
      ];
    }

    const closedTrips = await DBMODELS.TripPlan.findAll({
      where: {
        ...tripPlanWhere,
        Is_Completed: 1,
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
          // where: vehicleNo
          //   ? {
          //       VNumer: {
          //         [Op.like]: `%${vehicleNo}%`,
          //       },
          //     }
          //   : {},
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
        // {
        //   model: DBMODELS.CustRateMap,
        //   as: "CustRateMaps",
        //   on: literal(
        //     "`TripPlan`.`RouteId` = `TripPlan->CustRateMaps`.`RouteId` AND `TripPlan`.`CustId` = `TripPlan->CustRateMaps`.`CustId` AND `TripPlan`.`TripType` = `TripPlan->CustRateMaps`.`TripType`"
        //   ),
        //   include: [
        //     {
        //       model: DBMODELS.TripType,
        //       as: "trip_type",
        //       required: true,
        //       attributes: ["Id", "TypeName"],
        //     },
        //   ],
        //   attributes: [
        //     "ID",
        //     "CustId",
        //     "RouteId",
        //     "RouteType",
        //     "TripType",
        //     "RouteString",
        //   ],
        // },
        {
          model: DBMODELS.MarketCust,
          as: "MarketCust",
          // attributes: ["CustId", "CustomerName", "CustCode", "GSTNo"],
        },
        {
          model: DBMODELS.TripOperation,
          as: "TripOperations",
          attributes: ["Id", "TripNo", "ATA", "ATD"],
        },
      ],
    });

    return res.status(200).json({
      status: "200",
      message: "Record Found",
      closedTrips,
    });
  } catch (error) {
    console.error("Error in TripHistory:", {
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

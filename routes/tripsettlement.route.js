const SettlemantRouter = require('express').Router();
const TripSettlementController = require("../controllers/tripsettlement.controller");
const { authorizedUser } = require("../middlewares/authMiddleware");

SettlemantRouter.post('/getDetailsforTripSettlement',authorizedUser, TripSettlementController.getDetailsforTripSettlement);
SettlemantRouter.post("/createSettlement", authorizedUser, TripSettlementController.createTripSettlement);
SettlemantRouter.post('/getSettlement',authorizedUser, TripSettlementController.getTripSettlement);
SettlemantRouter.post('/getPandingSettlement',authorizedUser, TripSettlementController.getPandingSettlementrips);
SettlemantRouter.post('/getDriverDebit',authorizedUser, TripSettlementController.getDriverDebit);
SettlemantRouter.post('/createDriverDebit',authorizedUser, TripSettlementController.createDriverDebit);
SettlemantRouter.post('/getSettledTrips',authorizedUser, TripSettlementController.getSettledTrips);
SettlemantRouter.post('/updateSettlement',authorizedUser, TripSettlementController.UpdateTripSettlement);
SettlemantRouter.post('/updateDriverDebit',authorizedUser, TripSettlementController.updateDriverDebit);

module.exports = SettlemantRouter;



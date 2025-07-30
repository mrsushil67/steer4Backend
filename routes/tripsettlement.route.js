const SettlemantRouter = require('express').Router();
const TripSettlementController = require("../controllers/tripsettlement.controller");
const { authorizedUser } = require("../middlewares/authMiddleware");

SettlemantRouter.post('/getDetailsforTripSettlement', TripSettlementController.getDetailsforTripSettlement);
SettlemantRouter.post("/createSettlement", authorizedUser, TripSettlementController.createTripSettlement);
SettlemantRouter.post('/getSettlement', authorizedUser, TripSettlementController.getTripSettlement);
SettlemantRouter.post('/getPandingSettlement', TripSettlementController.getPandingSettlementrips);
SettlemantRouter.post('/getDriverDebit', TripSettlementController.getDriverDebit);
SettlemantRouter.post('/createDriverDebit', TripSettlementController.createDriverDebit);

module.exports = SettlemantRouter;



const SettlemantRouter = require('express').Router();
const TripSettlementController = require("../controllers/tripsettlement.controller");
const { authorizedUser } = require("../middlewares/authMiddleware");

SettlemantRouter.post('/getDetailsforTripSettlement',authorizedUser, TripSettlementController.getDetailsforTripSettlement);
SettlemantRouter.post("/createSettlement", authorizedUser, TripSettlementController.createTripSettlement);
SettlemantRouter.post('/getSettlement', authorizedUser, TripSettlementController.getTripSettlement);
SettlemantRouter.post('/getPandingSettlement', TripSettlementController.getPandingSettlementrips)

module.exports = SettlemantRouter;



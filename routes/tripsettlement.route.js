const SettlemantRouter = require('express').Router();
const TripSettlementController = require("../controllers/tripsettlement.controller");
const { authorizedUser } = require("../middlewares/authMiddleware");

SettlemantRouter.post("/createSettlement", authorizedUser, TripSettlementController.createTripSettlement);
SettlemantRouter.post('/getSettlement', authorizedUser, TripSettlementController.getTripSettlement);

module.exports = SettlemantRouter;



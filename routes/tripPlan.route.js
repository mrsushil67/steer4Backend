const TripRouter = require("express").Router();
const TripController = require("../controllers/tripPlan.controller");
const { authorizedUser } = require("../middlewares/authMiddleware");

TripRouter.get("/checkData", TripController.checkTripPlan);
TripRouter.post("/tripPlan", authorizedUser, TripController.tripPlan); // just check data
TripRouter.put('/update', TripController.updateTrip);
TripRouter.post('/cancel', TripController.cancelTrip);

module.exports = TripRouter;

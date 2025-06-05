const TripRouter = require("express").Router();
const TripController = require("../controllers/tripPlan.controller");
const { authorizedUser } = require("../middlewares/authMiddleware");

TripRouter.get("/checkData", TripController.checkTripPlan);
TripRouter.post("/tripPlan", authorizedUser, TripController.tripPlan); // just check data
TripRouter.put("/update", authorizedUser, TripController.updateTrip);
TripRouter.post("/cancel", authorizedUser, TripController.cancelTrip);

module.exports = TripRouter;

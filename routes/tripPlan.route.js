const TripRouter = require("express").Router();
const TripController = require("../controllers/tripPlan.controller");
const { authorizedUser } = require("../middlewares/authMiddleware");

TripRouter.get("/tripList", authorizedUser, TripController.checkTripPlan);
TripRouter.post("/submit", authorizedUser, TripController.tripPlan); // just check data
TripRouter.put("/update", authorizedUser, TripController.updateTrip);
TripRouter.post("/cancel", authorizedUser, TripController.cancelTrip);
TripRouter.post("/proceed", TripController.proceedTrip);

module.exports = TripRouter;

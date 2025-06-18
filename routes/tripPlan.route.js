const TripRouter = require("express").Router();
const TripController = require("../controllers/tripPlan.controller");
const { authorizedUser } = require("../middlewares/authMiddleware");

TripRouter.post("/tripList", TripController.checkTripPlan);
TripRouter.post("/submit", authorizedUser, TripController.tripPlan); // just check data
TripRouter.put("/update", authorizedUser, TripController.updateTrip);
TripRouter.post("/cancel", authorizedUser, TripController.cancelTrip);
TripRouter.post("/proceed",authorizedUser, TripController.proceedTrip);
TripRouter.get("/getOperation", TripController.tripOperations);
TripRouter.post("/onRouteUpdate", authorizedUser, TripController.onRouteTripDetails);
TripRouter.post("/closeTripUpdate", authorizedUser, TripController.closeTripDetails);
TripRouter.post("/submitMarketTrip", authorizedUser, TripController.marketTripPlan);
TripRouter.post("/closedTrip", TripController.closedTrips)

module.exports = TripRouter;

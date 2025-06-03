const generateTripSheet = require("../services/tripsheet");

module.exports.getTripSheetNumber = async (req, res) => {
  try {
    const { VehicleID } = req.body || {};
    if (!VehicleID) {
      return res
        .status(400)
        .json({ status: "400", message: "Vehicle Id is required." });
    }
    const tripSheet = await generateTripSheet(VehicleID);

    return res
      .status(200)
      .json({
        status: "200",
        message: "tripSheet created successfully",
        tripSheet,
      });
  } catch (error) {
    console.error("Error While creating tripSheet:", error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server error" });
  }
};

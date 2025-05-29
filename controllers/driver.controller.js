const { DBMODELS } = require("../models/init-models");
const { logg } = require("../utils/utils");

module.exports.getDriverLisence = async (req, res) => {
  try {
    const { Id } = req.params;
    const driver = await DBMODELS.Driver.findOne({
      where: { DriverID: Id },
      attributes: ["DName", "Licence"],
    });
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    return res
      .status(200)
      .json({ driver, message: "driver fetched successfully", status: true });
  } catch (error) {
    logg.error("Error fetching driver licence: " + error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

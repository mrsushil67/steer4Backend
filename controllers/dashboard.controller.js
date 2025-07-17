module.exports.CustomerStatus = () => {
  try {
    console.log("api will be for dashboard CustomerStatus");
    
  } catch (error) {
    console.error("Error in CustomerStatus :", error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.VehicleStatus = () => {
  try {
    console.log("api will be for dashboard VehicleStatus");
  } catch (error) {
    console.error("Error in VehicleStatus :", error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

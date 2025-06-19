const { Op } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.getAllCity = async (req, res) => {
  try {
    const { cityId = null, cityName = null } = req.body || {};

    if (cityName === " ") {
      return res
        .status(400)
        .json({ status: "400", message: "Invalid request" });
    }

    const whereCondition =
      cityName || cityId
        ? {
            [Op.or]: [
              {
                CityName: {
                  [Op.like]: `%${cityName}%`,
                },
              },
              { CityId: `${cityId}` },
            ],
          }
        : {};
    const allCities = await DBMODELS.city.findAll({
      where: whereCondition,
      attributes: ["CityId", "CityName", "stateId", "latitude", "longitude"],
      limit: 20,
    });
    if (allCities.length === 0) {
      return res
        .status(404)
        .json({ status: "404", message: "No record found" });
    }
    return res
      .status(200)
      .json({ status: "200", message: "Record found", data: allCities });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "500", message: "Internal server Error" });
  }
};

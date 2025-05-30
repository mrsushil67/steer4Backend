const { Op } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.getCustomerList = async (req, res) => {
  try {
    const { name = null || undefined } = req.body || {};

    const whereCondition = name
      ? {
          CustomerName: {
            [Op.like]: `%${name}%`,
          },
        }
      : {};

    const customers = await DBMODELS.CustomerMaster.findAll({
      where: whereCondition,
      attributes: ['CustId','CustCode','CustomerName'],
      limit: 20,
    });

    if (customers.length === 0) {
      return res.status(404).json({ status: "404",message: "Record not found" });
    }

    return res
      .status(200)
      .json({ status: "200", message: "Record found", customers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

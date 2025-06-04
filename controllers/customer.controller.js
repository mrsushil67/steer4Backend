const { Op } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.getCustomerList = async (req, res) => {
  try {
    const { name = null, ServiceType } = req.body || {};

    if (!ServiceType) {
      return res
        .status(400)
        .json({ status: "400", message: "ServiceType is required" });
    }

    const whereCondition = name
      ? {
          [Op.and]: [
            {
              CustomerName: {
                [Op.like]: `%${name}%`,
              },
            },
            {
              ServiceType,
            },
          ],
        }
      : { ServiceType };

    const customers = await DBMODELS.CustomerMaster.findAll({
      where: whereCondition,
      attributes: ['CustId','CustomerName','CustCode','ServiceType','CustomerType',],
      limit: 20,
    });

    if (customers.length === 0) {
      return res
        .status(404)
        .json({ status: "404", message: "Record not found" });
    }

    return res
      .status(200)
      .json({ status: "200", message: "Record found", customers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

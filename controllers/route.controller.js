const { Op } = require("sequelize");
const { DBMODELS } = require("../models/init-models");

module.exports.getRoutelist = async (req, res) => {
    try {
        const { CustId = null, RouteCat = null } = req.body || {};

        const whereCondition = {};
        if (CustId) whereCondition.CustId = CustId;
        if (RouteCat) whereCondition.RouteCat = RouteCat;

        const routes = await DBMODELS.RouteMaster.findAll({
            where: whereCondition,
        });

        if (routes.length === 0) {
            return res.status(404).json({ status: "404", message: "No records found" });
        }

        return res
            .status(200)
            .json({ status: "200", message: "Records found", routes });
    } catch (error) {
        console.error("Error fetching route list:", error);
        return res.status(500).json({ status: "500", message: "Internal server error" });
    }
};

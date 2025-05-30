const { DBMODELS } = require('../models/init-models');

module.exports.getRoutelist = async(req, res) => {
    try {
         const routes = await DBMODELS.RouteMaster.findAll({});
         return res.status(200).json({ status: "200", message: "Record found", routes})
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error")
    }
}
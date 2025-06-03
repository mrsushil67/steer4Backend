const { DBMODELS } = require("../models/init-models");

const generateTripSheet = async (V_id) => {
    const lastEntry = await DBMODELS.TripPlanSchedule.findOne({
        order: [['id', 'DESC']]
    });
    const tripSheetNumber = `TP-`+`${V_id}`+`00`+`${lastEntry ? lastEntry.ID + 1: '1'}`;
    return tripSheetNumber;
};

module.exports = generateTripSheet;
const { DBMODELS } = require("../models/init-models");
const moment = require("moment");

module.exports.createTripSettlement = async (req, res) => {
  try {
    const {
      GPsKms,
      GPsKmsExd,
      GoogleKms,
      GoogleKmsExd,
      StdKms,
      StartKms,
      CloseKms,
      TotalRun,
      ApproveKms,
      RatePkm,
      ApproveAmt,
      TAdvanceCash,
      TAdvncDiesl,
      TOnRTCash,
      TOnRTDiesel,
      TollCash,
      HandlingChrgs,
      OtherChargs,
      BalanceCash,
      BalanceDiesl,
      OtherChargsGvnBy,
      TCash,
      TDiesel,
      DieselRT,
      FastTag,
      FastTagNew,
      HChargs,
      OverChargs,
      OverloadReamrk,
      Remark,
      ToPay,
      Mileage,
      ExcDiesel,
      CreatedDate,
      CreatedBy,
      UpdateDate,
      UpdateBy,
      StartRemark,
      ExtraDiesel,
      MCDToll,
      CashReturn,
      MechCharge,
      MCDInCash,
      Date,
      CustName,
      Is_received,
      RDate,
      Is_Type,
      Days,
      PDate,
      FixedCash,
      FixedDiesel,
      DeptDate,
      ATA,
      dalaCharge,
      DalaChargeRemark,
      TotalAmtPaid,
      Tcat,
      DieselAmount,
      ToPayReturn,
      OthChargesToD,
      vehiclDebitD,
      Parking,
      Kanta,
      Challan,
      ChallanRemark,
      Pollution,
      Entry,
      EntryRemark,
      ExtraCash,
      Maintanance_die,
      TCommission,
    } = req.body;

    if (!GPsKms) {
      return res.status(400).json({ error: "missing GPsKms required." });
    }

    const formattedCreatedDate = CreatedDate
      ? moment(CreatedDate, "YYYY-MM-DD").toDate()
      : new Date();

    const formattedUpdatedDate = UpdateDate
      ? moment(UpdateDate, "YYYY-MM-DD").toDate()
      : new Date();

    const data = {
      GPsKms,
      GPsKmsExd,
      GoogleKms,
      GoogleKmsExd,
      StdKms,
      StartKms,
      CloseKms,
      TotalRun,
      ApproveKms,
      RatePkm,
      ApproveAmt,
      TAdvanceCash,
      TAdvncDiesl,
      TOnRTCash,
      TOnRTDiesel,
      TollCash,
      HandlingChrgs,
      OtherChargs,
      BalanceCash,
      BalanceDiesl,
      OtherChargsGvnBy,
      TCash,
      TDiesel,
      DieselRT,
      FastTag,
      FastTagNew,
      HChargs,
      OverChargs,
      OverloadReamrk,
      Remark,
      ToPay,
      Mileage,
      ExcDiesel,
      CreatedDate: formattedCreatedDate,
      CreatedBy,
      UpdateDate: formattedUpdatedDate,
      UpdateBy,
      StartRemark,
      ExtraDiesel,
      MCDToll,
      CashReturn,
      MechCharge,
      MCDInCash,
      Date,
      CustName,
      Is_received,
      RDate,
      Is_Type,
      Days,
      PDate,
      FixedCash,
      FixedDiesel,
      DeptDate,
      ATA,
      dalaCharge,
      DalaChargeRemark,
      TotalAmtPaid,
      Tcat,
      DieselAmount,
      ToPayReturn,
      OthChargesToD,
      vehiclDebitD,
      Parking,
      Kanta,
      Challan,
      ChallanRemark,
      Pollution,
      Entry,
      EntryRemark,
      ExtraCash,
      Maintanance_die,
      TCommission,
    };

    const tripSettlement = await DBMODELS.TripSettlement.create(data);

    return res.status(201).json(tripSettlement);
  } catch (error) {
    console.error("Error creating trip settlement:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports.getTripSettlement = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Trip ID is required." });
    }
    const tripSettlement = await DBMODELS.TripSettlement.findOne({
      where: { ID: id },
    });
    if (!tripSettlement) {
      return res.status(404).json({ error: "Trip settlement not found." });
    }
    return res.status(200).json(tripSettlement);
  } catch (error) {
    console.error("Error fetching trip settlement:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

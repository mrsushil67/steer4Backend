const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TripSettlement', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    GPsKms: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    GPsKmsExd: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    GoogleKms: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    GoogleKmsExd: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    StdKms: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    StartKms: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CloseKms: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TotalRun: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ApproveKms: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    RatePkm: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ApproveAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TAdvanceCash: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    TAdvncDiesl: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    TOnRTCash: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    TOnRTDiesel: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    TollCash: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    HandlingChrgs: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    OtherChargs: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    BalanceCash: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    BalanceDiesl: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    OtherChargsGvnBy: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TCash: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TDiesel: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    DieselRT: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    FastTag: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    FastTagNew: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    HChargs: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    OverChargs: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    OverloadReamrk: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ToPay: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Mileage: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ExcDiesel: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UpdateBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    StartRemark: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ExtraDiesel: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    MCDToll: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    CashReturn: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    MechCharge: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    MCDInCash: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    CustName: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Is_received: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    RDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Is_Type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Days: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    FixedCash: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    FixedDiesel: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    DeptDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ATA: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dalaCharge: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    DalaChargeRemark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    TotalAmtPaid: {
      type: DataTypes.DOUBLE(10,2),
      allowNull: true
    },
    Tcat: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    DieselAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ToPayReturn: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    OthChargesToD: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    vehiclDebitD: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Parking: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Kanta: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Challan: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ChallanRemark: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Pollution: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Entry: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    EntryRemark: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ExtraCash: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Maintanance_die: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TCommission: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TripSettlement',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "ID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "ID",
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "CreatedDate",
        using: "BTREE",
        fields: [
          { name: "CreatedDate" },
        ]
      },
      {
        name: "ID_2",
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "CustName",
        using: "BTREE",
        fields: [
          { name: "CustName" },
        ]
      },
      {
        name: "DeptDate",
        using: "BTREE",
        fields: [
          { name: "DeptDate" },
        ]
      },
      {
        name: "ATA",
        using: "BTREE",
        fields: [
          { name: "ATA" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OldTripSettlement', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TripSheet: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    VehicleId: {
      type: DataTypes.INTEGER,
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
    FastTag: {
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
    Is_Settled: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'OldTripSettlement',
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
    ]
  });
};

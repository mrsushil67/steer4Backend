const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DriverDebits', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    DriverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SettleId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CashDebit: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0.00
    },
    DieselQtyDB: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    DieselAmtDB: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      defaultValue: 0.00
    },
    VehcileId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Settledate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Remarks: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Total: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0.00
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "drivers"
    },
    DieselRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DriverDebits',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "SettleId",
        using: "BTREE",
        fields: [
          { name: "SettleId" },
        ]
      },
      {
        name: "DriverId",
        using: "BTREE",
        fields: [
          { name: "DriverId" },
        ]
      },
      {
        name: "Settledate",
        using: "BTREE",
        fields: [
          { name: "Settledate" },
        ]
      },
      {
        name: "Auto1",
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "VehcileId",
        using: "BTREE",
        fields: [
          { name: "VehcileId" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TripAdvance', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Ticket: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TtripNo: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Cash: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    DieselQty: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    DieselDt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DieselVendor: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Location: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    AdjDiesel: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    RemDiesel: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    VNumer: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Driver1Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Driver2Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Diesel_Rate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Amt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    FillCat: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TotalAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ExpCategory: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PaidBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "1. company 2. customer"
    }
  }, {
    sequelize,
    tableName: 'TripAdvance',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
      {
        name: "TripId",
        using: "BTREE",
        fields: [
          { name: "TripId" },
        ]
      },
      {
        name: "Ticket",
        using: "BTREE",
        fields: [
          { name: "Ticket" },
        ]
      },
    ]
  });
};

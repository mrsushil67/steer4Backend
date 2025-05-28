const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OnRouteExp', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TripNo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Ticket: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "Ticket_2"
    },
    Amt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    AmtDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    AmtGivenBy: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DieselQty: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    DieselDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DieselVendor: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DieselLocation: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    McdAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    McdDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    McdGivenBy: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
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
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Dstatus: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    DRemark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ApprovedBy: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    ApprovedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    isType: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    FillCat: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DieselRate: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    TotalAmt: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    ExpCategory: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'OnRouteExp',
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
        name: "Ticket_2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Ticket" },
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
        name: "TripNo",
        using: "BTREE",
        fields: [
          { name: "TripNo" },
        ]
      },
      {
        name: "VNumer",
        using: "BTREE",
        fields: [
          { name: "VNumer" },
        ]
      },
      {
        name: "Dstatus",
        using: "BTREE",
        fields: [
          { name: "Dstatus" },
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

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IssueTicket', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Ticket: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    VehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RouteID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CtrlActRoute: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CtrlAVerRoute: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Driver1Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Driver2Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DepartureTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Category: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    entrylogtime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Actuallogtime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tat: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Idle: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    CratetedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UpdatedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ActualStatus: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 1
    },
    NVehicle: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    control_remark: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    CurrentStatus: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Expenses: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      defaultValue: 0.00
    },
    cancel_status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    cancel_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    cancel_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'IssueTicket',
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
        name: "TripId",
        using: "BTREE",
        fields: [
          { name: "TripId" },
        ]
      },
      {
        name: "CustId",
        using: "BTREE",
        fields: [
          { name: "CustId" },
        ]
      },
      {
        name: "VehicleId",
        using: "BTREE",
        fields: [
          { name: "VehicleId" },
        ]
      },
      {
        name: "RouteID",
        using: "BTREE",
        fields: [
          { name: "RouteID" },
        ]
      },
      {
        name: "Driver1Id",
        using: "BTREE",
        fields: [
          { name: "Driver1Id" },
        ]
      },
      {
        name: "Driver2Id",
        using: "BTREE",
        fields: [
          { name: "Driver2Id" },
        ]
      },
      {
        name: "Category",
        using: "BTREE",
        fields: [
          { name: "Category" },
        ]
      },
    ]
  });
};

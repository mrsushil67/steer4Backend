const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TripPlanSchedule', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CustType: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TripType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    VehicleSize: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    VehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Driver1Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Driver2Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    VPlaceTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    DepartureTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Remark: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    TripSheet: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "TripSheet"
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ParentTripNo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    BookingType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PlanCat: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    is_final: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Tcat: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    BrId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Is_peak: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Ticket: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TripCategory: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    StartKm: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Freight: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TripPlanSchedule',
    hasTrigger: true,
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
        name: "TripSheet",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TripSheet" },
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
        name: "RouteId",
        using: "BTREE",
        fields: [
          { name: "RouteId" },
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
        name: "DepartureTime",
        using: "BTREE",
        fields: [
          { name: "DepartureTime" },
        ]
      },
    ]
  });
};

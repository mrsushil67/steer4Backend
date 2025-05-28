const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TripPlanAmend', {
    TripID: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    TripsheetOld: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    VehicleIdN: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Driver1IdN: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Driver2IdN: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TripsheetNew: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Reason: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Stat: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    AmendedTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Is_Settled: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    Is_type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 2
    },
    AmdLoc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    AmdRemark: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TripPlanAmend',
    timestamps: false,
    indexes: [
      {
        name: "fk_TripPlanAmend_2_idx",
        using: "BTREE",
        fields: [
          { name: "VehicleId" },
        ]
      },
      {
        name: "fk_TripPlanAmend_3_idx",
        using: "BTREE",
        fields: [
          { name: "Driver1Id" },
        ]
      },
      {
        name: "fk_TripPlanAmend_5_idx",
        using: "BTREE",
        fields: [
          { name: "Reason" },
        ]
      },
      {
        name: "TripID",
        using: "BTREE",
        fields: [
          { name: "TripID" },
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
        name: "TripsheetOld",
        using: "BTREE",
        fields: [
          { name: "TripsheetOld" },
        ]
      },
      {
        name: "VehicleIdN",
        using: "BTREE",
        fields: [
          { name: "VehicleIdN" },
        ]
      },
      {
        name: "Driver1IdN",
        using: "BTREE",
        fields: [
          { name: "Driver1IdN" },
        ]
      },
      {
        name: "Driver2IdN",
        using: "BTREE",
        fields: [
          { name: "Driver2IdN" },
        ]
      },
      {
        name: "Is_Settled",
        using: "BTREE",
        fields: [
          { name: "Is_Settled" },
        ]
      },
      {
        name: "Is_type",
        using: "BTREE",
        fields: [
          { name: "Is_type" },
        ]
      },
      {
        name: "Is_Settled_2",
        using: "BTREE",
        fields: [
          { name: "Is_Settled" },
        ]
      },
      {
        name: "Is_Settled_3",
        using: "BTREE",
        fields: [
          { name: "Is_Settled" },
        ]
      },
    ]
  });
};

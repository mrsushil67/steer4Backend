const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TripPlanAmend2', {
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
    tableName: 'TripPlanAmend2',
    timestamps: false
  });
};

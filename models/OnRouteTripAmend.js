const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OnRouteTripAmend', {
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    VehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Driver1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Driver2Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Tripsheet: {
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
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Touchings: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Is_Amended: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    AmendedTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'OnRouteTripAmend',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TripId" },
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
        name: "Is_Amended",
        using: "BTREE",
        fields: [
          { name: "Is_Amended" },
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
        name: "Tripsheet",
        using: "BTREE",
        fields: [
          { name: "Tripsheet" },
        ]
      },
    ]
  });
};

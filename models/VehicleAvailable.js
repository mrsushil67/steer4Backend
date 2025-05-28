const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VehicleAvailable', {
    VehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Is_Available: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    VStatus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 2
    },
    PlanAvail: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    PlanCount: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'VehicleAvailable',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "VehicleId" },
        ]
      },
      {
        name: "ID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "VehicleId" },
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
        name: "Is_Available",
        using: "BTREE",
        fields: [
          { name: "Is_Available" },
        ]
      },
      {
        name: "VStatus",
        using: "BTREE",
        fields: [
          { name: "VStatus" },
        ]
      },
      {
        name: "PlanAvail",
        using: "BTREE",
        fields: [
          { name: "PlanAvail" },
        ]
      },
      {
        name: "PlanCount",
        using: "BTREE",
        fields: [
          { name: "PlanCount" },
        ]
      },
    ]
  });
};

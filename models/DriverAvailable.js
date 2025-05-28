const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DriverAvailable', {
    DriverId: {
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
    DStatus: {
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
    VClass: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    BlockBy: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    BlockDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DriverAvailable',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DriverId" },
        ]
      },
      {
        name: "ID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DriverId" },
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
        name: "DStatus",
        using: "BTREE",
        fields: [
          { name: "DStatus" },
        ]
      },
      {
        name: "TripId",
        using: "BTREE",
        fields: [
          { name: "TripId" },
        ]
      },
    ]
  });
};

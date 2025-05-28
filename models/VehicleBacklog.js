const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VehicleBacklog', {
    VehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    VStatus: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TimeStamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'VehicleBacklog',
    timestamps: false,
    indexes: [
      {
        name: "TripId",
        using: "BTREE",
        fields: [
          { name: "TripId" },
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
        name: "VehicleId",
        using: "BTREE",
        fields: [
          { name: "VehicleId" },
        ]
      },
    ]
  });
};

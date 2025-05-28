const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DriverBacklog', {
    DriverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DStatus: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TimeStamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'DriverBacklog',
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
        name: "DStatus",
        using: "BTREE",
        fields: [
          { name: "DStatus" },
        ]
      },
      {
        name: "DriverId",
        using: "BTREE",
        fields: [
          { name: "DriverId" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TripInvStat', {
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Is_Invoice: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    InvDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    ModifyTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'TripInvStat',
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
        name: "TripId_UNIQUE",
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
    ]
  });
};

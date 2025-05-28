const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RateUpdtRecords', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RouteID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RouteType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TripType: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    VSize: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    OldFreight: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    NewFreight: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    UpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UpdatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'RateUpdtRecords',
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
        name: "ID",
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};

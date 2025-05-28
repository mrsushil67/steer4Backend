const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RouteDriverMap', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "RouteId"
    },
    Vehciles: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Drivers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PRouteId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TotalVahicle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'RouteDriverMap',
    timestamps: true,
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
        name: "RouteId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RouteId" },
        ]
      },
    ]
  });
};

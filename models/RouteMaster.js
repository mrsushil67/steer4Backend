const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RouteMaster', {
    RouteId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RouteCode: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Source: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Destination: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Distance: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RouteCat: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'RouteMaster',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RouteId" },
        ]
      },
      {
        name: "RouteId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RouteId" },
        ]
      },
      {
        name: "fk_RouteMaster_1_idx",
        using: "BTREE",
        fields: [
          { name: "Source" },
        ]
      },
      {
        name: "fk_RouteMaster_2_idx",
        using: "BTREE",
        fields: [
          { name: "Destination" },
        ]
      },
    ]
  });
};

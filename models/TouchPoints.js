const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TouchPoints', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RouteOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Distance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Arrival: {
      type: DataTypes.TIME,
      allowNull: true
    },
    Departure: {
      type: DataTypes.TIME,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TouchPoints',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
      {
        name: "Id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
      {
        name: "fk_TouchPoints_1_idx",
        using: "BTREE",
        fields: [
          { name: "RouteId" },
        ]
      },
      {
        name: "fk_TouchPoints_2_idx",
        using: "BTREE",
        fields: [
          { name: "CityId" },
        ]
      },
    ]
  });
};

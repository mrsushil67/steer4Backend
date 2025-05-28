const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RouteRate', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RouteType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TripType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    VehicleSize: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Rate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'RouteRate',
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
    ]
  });
};

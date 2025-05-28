const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VehicleLength', {
    TruckLengthId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    VehicleTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TruckCapacityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    size_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sizeTitle: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    length: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    width: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'VehicleLength',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TruckLengthId" },
        ]
      },
      {
        name: "truckTypeId",
        using: "BTREE",
        fields: [
          { name: "TruckCapacityId" },
        ]
      },
      {
        name: "VehicleTypeId",
        using: "BTREE",
        fields: [
          { name: "VehicleTypeId" },
        ]
      },
      {
        name: "size_id",
        using: "BTREE",
        fields: [
          { name: "size_id" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VehicleCapacity', {
    CapacityId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    VehicleTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Capacity: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'VehicleCapacity',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CapacityId" },
        ]
      },
      {
        name: "truckLengthId",
        using: "BTREE",
        fields: [
          { name: "VehicleTypeId" },
        ]
      },
    ]
  });
};

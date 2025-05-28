const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rate_per_km', {
    rate_per_km_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    VehicleTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kms_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TruckLengthId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price_per_km: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    TruckCapacityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    size_title: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'rate_per_km',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rate_per_km_id" },
        ]
      },
      {
        name: "TruckLengthId",
        using: "BTREE",
        fields: [
          { name: "TruckLengthId" },
        ]
      },
      {
        name: "kms_id",
        using: "BTREE",
        fields: [
          { name: "kms_id" },
        ]
      },
      {
        name: "VehicleTypeId",
        using: "BTREE",
        fields: [
          { name: "VehicleTypeId" },
        ]
      },
    ]
  });
};

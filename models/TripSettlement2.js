const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TripSettlement2', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    VehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DipoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Sid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "Sid_2"
    },
    StdType: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TripSettlement2',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "Sid_2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Sid" },
        ]
      },
      {
        name: "TripId",
        using: "BTREE",
        fields: [
          { name: "TripId" },
        ]
      },
      {
        name: "CustId",
        using: "BTREE",
        fields: [
          { name: "CustId" },
        ]
      },
      {
        name: "RouteId",
        using: "BTREE",
        fields: [
          { name: "RouteId" },
        ]
      },
      {
        name: "VehicleId",
        using: "BTREE",
        fields: [
          { name: "VehicleId" },
        ]
      },
      {
        name: "DipoId",
        using: "BTREE",
        fields: [
          { name: "DipoId" },
        ]
      },
      {
        name: "Sid",
        using: "BTREE",
        fields: [
          { name: "Sid" },
        ]
      },
      {
        name: "StdType",
        using: "BTREE",
        fields: [
          { name: "StdType" },
        ]
      },
    ]
  });
};

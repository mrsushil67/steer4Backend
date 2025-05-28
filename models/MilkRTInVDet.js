const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MilkRTInVDet', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    InvID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    InvRand: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TripID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TripStartDT: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    VehicleId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    VehicleSize: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    routeString: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OpeningKm: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    ClosingKm: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    CappingKm: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    TotalKm: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    ToBeBilledKm: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    RPM: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    BaseRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    ReviceRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    Diffrrence: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    SMileage: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    FSCKM: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    Fright: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    Fsc: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    TotalAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    TripNo: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'MilkRTInVDet',
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

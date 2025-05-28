const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DailyRateRevise', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RouteID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    VehSize: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    MileAge: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    Freight: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    KMs: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    BaseDRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    ReviseDRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    FSCAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    SaleValue: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    UpdatedTM: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    RouteType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TripType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Is_std: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'DailyRateRevise',
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
        name: "RouteID",
        using: "BTREE",
        fields: [
          { name: "RouteID" },
        ]
      },
      {
        name: "VehSize",
        using: "BTREE",
        fields: [
          { name: "VehSize" },
        ]
      },
      {
        name: "TripType",
        using: "BTREE",
        fields: [
          { name: "TripType" },
        ]
      },
    ]
  });
};

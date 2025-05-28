const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FSCalc', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RouteID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RouteType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    VehSize: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TripType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    MileAge: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    Freight: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    KMs: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    BaseDRate: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    ReviseDRate: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    FSCAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    SaleValue: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    SrcDepoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SrcSubDepoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DestDepoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DestSubDepoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UpdatedTM: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'FSCalc',
    timestamps: false,
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
        name: "ID",
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "RouteID",
        using: "BTREE",
        fields: [
          { name: "RouteID" },
        ]
      },
    ]
  });
};

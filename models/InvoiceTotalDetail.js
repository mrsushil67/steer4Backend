const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('InvoiceTotalDetail', {
    id: {
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
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Period: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Route: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    Sac_Code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    V_size: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    No_of_trip: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Rate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    FSC: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    GTax: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TotalAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'InvoiceTotalDetail',
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
        name: "InvID",
        using: "BTREE",
        fields: [
          { name: "InvID" },
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
    ]
  });
};

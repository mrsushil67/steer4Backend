const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('InvoiceMaster', {
    InvoiceId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    InvoiceNo: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    InvType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FromDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ToDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    InvDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    InvCat: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    InvoiceType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    RouteType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TripType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UpdateBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'InvoiceMaster',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "InvoiceId" },
        ]
      },
      {
        name: "InvoiceID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "InvoiceId" },
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
        name: "CreatedBy",
        using: "BTREE",
        fields: [
          { name: "CreatedBy" },
        ]
      },
    ]
  });
};

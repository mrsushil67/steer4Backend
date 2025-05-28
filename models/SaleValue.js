const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SaleValue', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    SettleID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Sale: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Exp: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Diffrence: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    Cat: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    SetRemark: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'SaleValue',
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
        name: "SettleID",
        using: "BTREE",
        fields: [
          { name: "SettleID" },
        ]
      },
      {
        name: "SettleID_2",
        using: "BTREE",
        fields: [
          { name: "SettleID" },
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
        name: "SettleID_3",
        using: "BTREE",
        fields: [
          { name: "SettleID" },
        ]
      },
      {
        name: "SettleID_4",
        using: "BTREE",
        fields: [
          { name: "SettleID" },
        ]
      },
    ]
  });
};

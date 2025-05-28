const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DriverAccount', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DriverID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AccNo: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    IfscCode: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    BankName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    UpdateBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UpdateTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DriverAccount',
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
        name: "Id",
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
      {
        name: "DriverID",
        using: "BTREE",
        fields: [
          { name: "DriverID" },
        ]
      },
      {
        name: "DriverID_2",
        using: "BTREE",
        fields: [
          { name: "DriverID" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VendorDetails', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    VendorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    GstNo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    GstAddress: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    GstAddress1: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    OMC: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Location: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ContactP1: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Designation1: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Phone1: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    ContactP2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Designation2: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Phone2: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    CreditPeriod: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    HSNCode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TinNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    PanNo: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'VendorDetails',
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
        name: "FKVendor",
        using: "BTREE",
        fields: [
          { name: "VendorId" },
        ]
      },
    ]
  });
};

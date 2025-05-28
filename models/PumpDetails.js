const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PumpDetails', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Dipo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PumpName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    VendorId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    alias: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PumpDetails',
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
        name: "FKVendorId",
        using: "BTREE",
        fields: [
          { name: "VendorId" },
        ]
      },
    ]
  });
};

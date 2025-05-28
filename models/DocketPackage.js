const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DocketPackage', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ActaulWeight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ChargedWeight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    WoodenBox: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CartoonBox: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Bags: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DocketPackage',
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
        name: "ID_UNIQUE",
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
    ]
  });
};

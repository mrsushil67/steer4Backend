const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MplFsc', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Sid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "Sid"
    },
    Kms: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    AddKms: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TotalKms: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Add3Kms: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Rate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Fright: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Discount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TotalAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ReviseRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    BaseRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Diff: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    SAVG: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    FSC: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    SaleValue: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    is_verified: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'MplFsc',
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
        name: "Sid",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Sid" },
        ]
      },
      {
        name: "Id",
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};

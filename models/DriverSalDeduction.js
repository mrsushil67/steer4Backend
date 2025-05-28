const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DriverSalDeduction', {
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
    Month: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SalAdvance: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Contribution: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    FuelDebit: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    OpsDebit: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    TollDebit: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Amount: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DriverSalDeduction',
    timestamps: true,
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
        name: "DriverID",
        using: "BTREE",
        fields: [
          { name: "DriverID" },
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

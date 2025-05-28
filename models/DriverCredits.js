const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DriverCredits', {
    DriverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TCash: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0.00
    },
    TDieselQTy: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    TDieselAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      defaultValue: 0.00
    },
    SalAdvance: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      defaultValue: 0.00
    }
  }, {
    sequelize,
    tableName: 'DriverCredits',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DriverId" },
        ]
      },
      {
        name: "DvDInd",
        using: "BTREE",
        fields: [
          { name: "DriverId" },
        ]
      },
    ]
  });
};

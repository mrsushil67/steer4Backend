const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BillingCycle', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Description: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "Description_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'BillingCycle',
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
        name: "Id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
      {
        name: "Description_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Description" },
        ]
      },
    ]
  });
};

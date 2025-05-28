const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CustomerSac', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Sac_Code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "Tariff_Desc_UNIQUE"
    },
    GST: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CustomerSac',
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
        name: "Tariff_Desc_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Sac_Code" },
        ]
      },
    ]
  });
};

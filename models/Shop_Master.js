const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Shop_Master', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    shop: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Location: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    Phone_number: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Services_Offered: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Shop_Master',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

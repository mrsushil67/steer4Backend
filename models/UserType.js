const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserType', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Active: {
      type: DataTypes.STRING(11),
      allowNull: true,
      defaultValue: "Active"
    },
    DefaultRole: {
      type: DataTypes.STRING(11),
      allowNull: false,
      defaultValue: "No"
    }
  }, {
    sequelize,
    tableName: 'UserType',
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
    ]
  });
};

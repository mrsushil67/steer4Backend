const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CustomerSeviceType', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ServiceName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "ServiceName_UNIQUE"
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'CustomerSeviceType',
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
        name: "ServiceName_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ServiceName" },
        ]
      },
    ]
  });
};

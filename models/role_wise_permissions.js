const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role_wise_permissions', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    roleId: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    MenuId: {
      type: DataTypes.STRING(11),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'role_wise_permissions',
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
      {
        name: "roleId",
        using: "BTREE",
        fields: [
          { name: "roleId" },
        ]
      },
      {
        name: "MenuId",
        using: "BTREE",
        fields: [
          { name: "MenuId" },
        ]
      },
    ]
  });
};

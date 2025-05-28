const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('parent_manus', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    ParentMenu: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    MenuIcon: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    class: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    Order: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'parent_manus',
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

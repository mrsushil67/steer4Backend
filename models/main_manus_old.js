const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('main_manus_old', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    projectName: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ParentMenu: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    MenuIcon: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    MenuName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Icon: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'main_manus_old',
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

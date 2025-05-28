const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_masters', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    ProjectName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    ProjectUrl: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    ProjectIcon: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    isActive: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Serial: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'project_masters',
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

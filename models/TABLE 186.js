const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TABLE 186', {
    'COL 1': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    'COL 2': {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    'COL 3': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    'COL 4': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    'COL 5': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    'COL 6': {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    'COL 7': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    'COL 8': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    'COL 9': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    'COL 10': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    'COL 11': {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TABLE 186',
    timestamps: false
  });
};

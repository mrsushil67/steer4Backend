const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TABLE 146', {
    'COL 1': {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    'COL 2': {
      type: DataTypes.STRING(29),
      allowNull: true
    },
    'COL 3': {
      type: DataTypes.STRING(26),
      allowNull: true
    },
    'COL 4': {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    'COL 5': {
      type: DataTypes.STRING(142),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TABLE 146',
    timestamps: false
  });
};

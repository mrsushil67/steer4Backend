const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TABLE 148', {
    'COL 1': {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    'COL 2': {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TABLE 148',
    timestamps: false
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TABLE 138', {
    'COL 1': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    'COL 2': {
      type: DataTypes.STRING(11),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TABLE 138',
    timestamps: false
  });
};

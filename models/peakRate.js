const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('peakRate', {
    route: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'peakRate',
    timestamps: false
  });
};

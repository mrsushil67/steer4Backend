const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RouteRateValidation', {
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Is_Created: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'RouteRateValidation',
    timestamps: false
  });
};

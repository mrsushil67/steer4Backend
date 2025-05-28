const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VehicelDepo', {
    Vehicle: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    Depo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'VehicelDepo',
    timestamps: false
  });
};

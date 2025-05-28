const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DriverBlockDetails', {
    DId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BlockStataus: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BlockBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BlockDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    UpdateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'DriverBlockDetails',
    timestamps: false
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DeletedTrips', {
    TripSheet: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PlanCat: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    DeletedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'DeletedTrips',
    timestamps: false
  });
};

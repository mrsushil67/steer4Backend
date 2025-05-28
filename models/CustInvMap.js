const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CustInvMap', {
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TripID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CustTripUpId: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    CustTripDwId: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    VRID: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    VRIDR: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CustInvMap',
    timestamps: false
  });
};

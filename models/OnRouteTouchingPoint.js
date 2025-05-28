const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OnRouteTouchingPoint', {
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Touchpoint: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'OnRouteTouchingPoint',
    timestamps: false,
    indexes: [
      {
        name: "TripId",
        using: "BTREE",
        fields: [
          { name: "TripId" },
        ]
      },
      {
        name: "Touchpoint",
        using: "BTREE",
        fields: [
          { name: "Touchpoint" },
        ]
      },
    ]
  });
};

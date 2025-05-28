const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ServiceTrackingTrans', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    ServiceTrackId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    serviceProvider: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shop_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Created_By: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ServiceTrackingTrans',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

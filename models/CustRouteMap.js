const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CustRouteMap', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'RouteMaster',
        key: 'RouteId'
      }
    },
    tax: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TAT: {
      type: DataTypes.FLOAT(10,2),
      allowNull: true
    },
    CRCode: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DocRef: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CustRouteMap',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
      {
        name: "Id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
      {
        name: "RouteId",
        using: "BTREE",
        fields: [
          { name: "RouteId" },
        ]
      },
    ]
  });
};

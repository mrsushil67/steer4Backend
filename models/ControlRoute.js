const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ControlRoute', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    RouteString: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ControlRoute',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "CustId",
        using: "BTREE",
        fields: [
          { name: "CustId" },
        ]
      },
      {
        name: "ID",
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};

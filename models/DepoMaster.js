const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DepoMaster', {
    DepoId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DepoName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    CityId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Budget: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 10000.00
    }
  }, {
    sequelize,
    tableName: 'DepoMaster',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DepoId" },
        ]
      },
      {
        name: "DepoId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DepoId" },
        ]
      },
      {
        name: "FkLoc1",
        using: "BTREE",
        fields: [
          { name: "CityId" },
        ]
      },
    ]
  });
};

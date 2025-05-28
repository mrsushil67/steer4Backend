const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Hr_Locations', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    EmpId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Street: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    City: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    State: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    Pin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Address: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Hr_Locations',
    timestamps: true,
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
        name: "FkEmployee",
        using: "BTREE",
        fields: [
          { name: "EmpId" },
        ]
      },
    ]
  });
};

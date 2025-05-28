const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DummyTripSheet', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TripID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TripSheet: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    DTripSheet: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Dept: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ATA: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DummyTripSheet',
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
        name: "Dept",
        using: "BTREE",
        fields: [
          { name: "Dept" },
        ]
      },
      {
        name: "DTripSheet",
        using: "BTREE",
        fields: [
          { name: "DTripSheet" },
        ]
      },
      {
        name: "TripID",
        using: "BTREE",
        fields: [
          { name: "TripID" },
        ]
      },
    ]
  });
};

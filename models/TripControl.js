const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TripControl', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ATD: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ETA: {
      type: DataTypes.DATE,
      allowNull: true
    },
    TAT: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ATA: {
      type: DataTypes.DATE,
      allowNull: true
    },
    RouteKMS: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Stat: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    TripNo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ActualKM: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TripControl',
    hasTrigger: true,
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
        name: "fk_TripControl_2_idx",
        using: "BTREE",
        fields: [
          { name: "Stat" },
        ]
      },
      {
        name: "TripId",
        using: "BTREE",
        fields: [
          { name: "TripId" },
        ]
      },
      {
        name: "TripNo",
        using: "BTREE",
        fields: [
          { name: "TripNo" },
        ]
      },
    ]
  });
};

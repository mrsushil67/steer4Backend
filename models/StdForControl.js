const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('StdForControl', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Routeid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    placment: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Departure: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tat: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    Arrival: {
      type: DataTypes.DATE,
      allowNull: false
    },
    slat: {
      type: DataTypes.STRING(155),
      allowNull: true
    },
    dlong: {
      type: DataTypes.STRING(155),
      allowNull: true
    },
    TripType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DestLat: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    DestLong: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'StdForControl',
    timestamps: false,
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

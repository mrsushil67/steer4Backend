const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TouchPointsTiming', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TripId: {
      type: DataTypes.MEDIUMINT,
      allowNull: true
    },
    TripNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    TouchId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CityId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    RouteOrder: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Intime: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    OutTime: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    delay: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "\t1.Origin 2.dest. 3.TouchPoint"
    },
    Indate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    OutDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TouchPointsTiming',
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
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AccidentVehicle', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Ticket_ID: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Category_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Vehicle_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Driver1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Driver2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Logtime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Ticket_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    cancel_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    cancel_status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    cancel_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'AccidentVehicle',
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

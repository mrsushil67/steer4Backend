const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DriverAttendance', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    DriverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Month: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Day: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Tripsheet: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    TripNo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Vid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    UpdateBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Tcat: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'DriverAttendance',
    timestamps: false,
    indexes: [
      {
        name: "DriverIndx",
        using: "BTREE",
        fields: [
          { name: "DriverId" },
        ]
      },
      {
        name: "DateIndex",
        using: "BTREE",
        fields: [
          { name: "Day" },
        ]
      },
      {
        name: "Id",
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
      {
        name: "Month",
        using: "BTREE",
        fields: [
          { name: "Month" },
        ]
      },
      {
        name: "Year",
        using: "BTREE",
        fields: [
          { name: "Year" },
        ]
      },
      {
        name: "TripId",
        using: "BTREE",
        fields: [
          { name: "TripId" },
        ]
      },
    ]
  });
};

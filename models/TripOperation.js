const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TripOperation', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TripNo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    InvoiceCopy: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    LRCopy: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    DAV: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    GatePass: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    POD: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    EwayBilNo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ATD: {
      type: DataTypes.DATE,
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ATA: {
      type: DataTypes.DATE,
      allowNull: true
    },
    AmendReason: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Stat: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    StartBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    OnRouteBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CloseBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Is_Invoice: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    Remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    OpeningKm: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ClosingKm: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ActulaKm: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    CVerify: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    TripSheetNo: {
      type: DataTypes.STRING(11),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TripOperation',
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
        name: "fk_TripOperation_1_idx",
        using: "BTREE",
        fields: [
          { name: "AmendReason" },
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
      {
        name: "ATA",
        using: "BTREE",
        fields: [
          { name: "ATA" },
        ]
      },
      {
        name: "ATD",
        using: "BTREE",
        fields: [
          { name: "ATD" },
        ]
      },
      {
        name: "Is_Invoice",
        using: "BTREE",
        fields: [
          { name: "Is_Invoice" },
        ]
      },
      {
        name: "StartBy",
        using: "BTREE",
        fields: [
          { name: "StartBy" },
        ]
      },
      {
        name: "OnRouteBy",
        using: "BTREE",
        fields: [
          { name: "OnRouteBy" },
        ]
      },
      {
        name: "CloseBy",
        using: "BTREE",
        fields: [
          { name: "CloseBy" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RTInVDet', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    InvID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TripID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TripSheet: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    TripStartDT: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    VehicleId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    VehicleSize: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    RateId: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false
    },
    TaxId: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TripNo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    routeString: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    TotalAmt: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'RTInVDet',
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
        name: "FKRTInvDet1_idx",
        using: "BTREE",
        fields: [
          { name: "TripID" },
        ]
      },
      {
        name: "FKRTInvDet1_idx1",
        using: "BTREE",
        fields: [
          { name: "TripNo" },
        ]
      },
      {
        name: "TripSheet",
        using: "BTREE",
        fields: [
          { name: "TripSheet" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('InvoiceDetail', {
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
      allowNull: true
    },
    VehicleId: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    VehicleSize: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    RateId: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    TaxId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FSC: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TotalAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    VRID: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CustTripUpId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CustTripDwId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Discount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    routeString: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Ratebifurcation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ConID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    GatePassNo: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    Overload: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TripType: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    UpdateBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'InvoiceDetail',
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
        name: "fk_InvoiceDetail_1_idx",
        using: "BTREE",
        fields: [
          { name: "TaxId" },
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

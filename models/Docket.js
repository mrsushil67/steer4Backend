const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Docket', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TripID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TripNo: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    Docket: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "Docket_UNIQUE"
    },
    Origin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Dstination: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Consignor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Consignee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    InvoiceNo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    PackageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DocketPackage',
        key: 'ID'
      }
    },
    EwayBill: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    PODstat: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    TripChargeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TripCharges',
        key: 'ID'
      }
    },
    BookingDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ExpDeliveryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DeliveryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ModifiedTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ConsignorAdd: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ConsigneeAdd: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Risk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    CustTripUpId: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    CustTripDwId: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    VRID: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    VRIDR: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    DocketImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Docket',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "ID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "Docket_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Docket" },
        ]
      },
      {
        name: "fkdocket1_idx",
        using: "BTREE",
        fields: [
          { name: "TripChargeId" },
        ]
      },
      {
        name: "fkpckg2_idx",
        using: "BTREE",
        fields: [
          { name: "PackageId" },
        ]
      },
      {
        name: "TripID",
        using: "BTREE",
        fields: [
          { name: "TripID" },
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

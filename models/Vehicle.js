const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Vehicle', {
    VehicleID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    VNumer: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    State: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    VMaker: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    VSegment: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    VMYCL: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    FleetZize: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Cargodeck: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    YOM: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    DATE: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    OwnerName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    EngineNo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ChassisNo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    VendorId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DepoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    InsuranceComp: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    POLICYNO: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    IDV: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    NCB: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Insissuedate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Insduedate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Roadissuedate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    roadduedate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Npissuedate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Npduedate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    fitissuedate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Fitduedate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    GPissue: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    GPDue: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Premium: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    POLICYtype: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Bharatstage: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Unladen: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    GVW: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    RCissue: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    RCDue: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Pollutionissue: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    PollutionDue: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Invoiceissue: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    InvoiceDue: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Is_active: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    TyreQ: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    VStatus: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "0:Inhouse,1.sold,2.Total Loss,3 :Market"
    },
    VbreakDown: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    std_size: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Vehicle',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "VehicleID" },
          { name: "VNumer" },
        ]
      },
      {
        name: "VehicleID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "VehicleID" },
        ]
      },
      {
        name: "VNumer_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "VNumer" },
        ]
      },
      {
        name: "FleetSize0101_idx",
        using: "BTREE",
        fields: [
          { name: "FleetZize" },
        ]
      },
    ]
  });
};

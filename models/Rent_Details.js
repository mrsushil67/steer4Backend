const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rent_Details', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    godown: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Concern_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Landlord: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Pancard: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    AadhaarNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    GSTNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ACHolderName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ifscCode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Bank: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Tenure: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ExpireDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Aggrement: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    NPD: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Increase: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Security: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    TDS: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    MonthlyAmount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    GSTAmount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    TDSAmount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    PayableAmount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    LandlordPancard: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    LabourAadhaarNo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    LandlordGSTNo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    AggrementFile: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    SecurityAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    SecurityDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    SecurtPaymentMode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Chq: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    AcNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ContactNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TenureTo: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    TDSPer: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    GSTPer: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    UplBackPassBook: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    RentAmountDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Close: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Rent_Details',
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

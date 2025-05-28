const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OtherDriverDebit', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RVoucher: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    VoucherNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    VoucherImage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DriverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    VNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Cash: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    GivenBy: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    GivenDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Location: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    DebitType: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    SalaryAdvType: {
      type: DataTypes.ENUM('In-Hand','In-Account'),
      allowNull: true
    },
    Remark: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Remark2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Sid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TripSheet: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DriverVoucherWithSig: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    SalRemark: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    SalStatus: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'OtherDriverDebit',
    timestamps: true,
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
        name: "TripId",
        using: "BTREE",
        fields: [
          { name: "TripId" },
        ]
      },
      {
        name: "Sid",
        using: "BTREE",
        fields: [
          { name: "Sid" },
        ]
      },
      {
        name: "DriverId",
        using: "BTREE",
        fields: [
          { name: "DriverId" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ImpTransactionDetailsExp', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DipoId: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    Debit: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    Debit_Reason: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Trip_ID: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    Creadit: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    Balance: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Credit_Reason: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Reason: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    TYpe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "credit=1,Debit=2"
    },
    CreatedBy: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    BankId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DriverID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Bill_Image: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    PaymentMode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AccType: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    AdviceNo: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    FromDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ToDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Parent: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ExpStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    ExpRemark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    UpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Tripno: {
      type: DataTypes.STRING(75),
      allowNull: true
    },
    vehicle: {
      type: DataTypes.STRING(75),
      allowNull: true
    },
    driver: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    MangerApprovalTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    HoApprovalTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DepoApprovalTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    RejectRemarkManager: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    RejectRemarkDepo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    HoRemark: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ImpTransactionDetailsExp',
    timestamps: true,
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

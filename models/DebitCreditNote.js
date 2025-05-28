const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DebitCreditNote', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Invoiceid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    InvoiceNo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CDNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Notedate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    AmountType: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    GST: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "1. Debit 2. Credit"
    },
    CreditPeriod: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Sub_Date: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DueDate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Overdue_Date: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Overduedays: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Intimation_Date: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Remarks: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ReverseCharge: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    Islogo: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    IsFooter: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    isSheel: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DebitCreditNote',
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
    ]
  });
};

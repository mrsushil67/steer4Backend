const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PaymentReciept', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    RecNo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    CustId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    RecAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    PaymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    PaymentMode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BankName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    AccountNo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    UpiId: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    MobileNo: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    CashRecNo: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    TransactionID: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    ReceivedBy: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    PaymentType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "1.Regular2.Market"
    },
    Remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PaymentReciept',
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

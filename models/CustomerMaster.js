const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CustomerMaster', {
    CustId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CustomerName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    CustCode: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    GSTName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    GSTNo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    PANNo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    TinNo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    BillingCycle: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ServiceType: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    CustomerType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Sac_Code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PaymentMode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CreditPeriod: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    IsGst: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    GSTPercent: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    TDS: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    IsTds: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CustomerMaster',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CustId" },
        ]
      },
      {
        name: "fk_CustomerMaster_2_idx",
        using: "BTREE",
        fields: [
          { name: "BillingCycle" },
        ]
      },
      {
        name: "fk_CustomerMaster_3_idx",
        using: "BTREE",
        fields: [
          { name: "ServiceType" },
        ]
      },
      {
        name: "fk_CustomerMaster_4_idx",
        using: "BTREE",
        fields: [
          { name: "CustomerType" },
        ]
      },
      {
        name: "fk_CustomerMaster_5_idx",
        using: "BTREE",
        fields: [
          { name: "Sac_Code" },
        ]
      },
      {
        name: "fk_CustomerMaster_5_idx1",
        using: "BTREE",
        fields: [
          { name: "PaymentMode" },
        ]
      },
    ]
  });
};

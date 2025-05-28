const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VendorMaster', {
    VendId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    VendName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    VendCode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    GstName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Phone: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    BillingCycle: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    VendType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Brand: {
      type: DataTypes.STRING(20),
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
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    ladger: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    VendorCategory: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'VendorMaster',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "VendId" },
        ]
      },
    ]
  });
};

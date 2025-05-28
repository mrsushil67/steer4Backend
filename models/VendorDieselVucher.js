const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VendorDieselVucher', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Vid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    AddressId: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    VoucherNo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    BillNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    FromDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ToDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Rate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    gstper: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    BillImage: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    is_final: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    Discount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    File: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'VendorDieselVucher',
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

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CashRequest', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DepoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RequestTo: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    Amount: {
      type: DataTypes.STRING(75),
      allowNull: true
    },
    Remark: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Date: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RemarkHo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    AmountHo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    statusByHo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3
    },
    ManagerApprovalTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DepoApprovalTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    HoApprovalTime: {
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
    closingBal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CashRequest',
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

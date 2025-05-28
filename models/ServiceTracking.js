const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ServiceTracking', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    depot: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    vehicleNo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    shop: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    serviceProvider: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ActualAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ApprovalAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    SubmittedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DebitAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    BillNo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ServiceTracking',
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

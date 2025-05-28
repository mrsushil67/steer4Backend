const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Emp_Bank', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    EmpId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BankName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    AccountNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    IfscCode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Branch: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Emp_Bank',
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
      {
        name: "EmpId",
        using: "BTREE",
        fields: [
          { name: "EmpId" },
        ]
      },
    ]
  });
};

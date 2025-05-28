const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Hr_Leave_Transaction', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    EmpID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RegisterID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AnnualLeave: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EarnedLeave: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    GovtLeave: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UpadtedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Hr_Leave_Transaction',
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
        name: "FK_EMP_01",
        using: "BTREE",
        fields: [
          { name: "EmpID" },
        ]
      },
      {
        name: "FK_Register_01",
        using: "BTREE",
        fields: [
          { name: "RegisterID" },
        ]
      },
    ]
  });
};

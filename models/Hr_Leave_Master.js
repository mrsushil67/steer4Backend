const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Hr_Leave_Master', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    EmpID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    LeaveType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    LeaveMode: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    FromDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ToDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Status: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Hr_Approval: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    Mgr_Approval: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    Remark: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    LeaveReqDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    CretedAT: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'Hr_Leave_Master',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "ID",
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "EmpID",
        using: "BTREE",
        fields: [
          { name: "EmpID" },
        ]
      },
      {
        name: "FK_Leave",
        using: "BTREE",
        fields: [
          { name: "LeaveType" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Emp_Attend', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Emp_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Month: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Day: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    PunchIn: {
      type: DataTypes.TIME,
      allowNull: true
    },
    PunchOut: {
      type: DataTypes.TIME,
      allowNull: true
    },
    Status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    PunchType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    LeaveType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    LeaveRequest: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    LastActivity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "1.punchIn 2 PounchOut"
    }
  }, {
    sequelize,
    tableName: 'Emp_Attend',
    timestamps: true,
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
        name: "FkEmp4",
        using: "BTREE",
        fields: [
          { name: "Emp_ID" },
        ]
      },
    ]
  });
};

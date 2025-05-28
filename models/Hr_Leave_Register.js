const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Hr_Leave_Register', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DeptID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    JobID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Year: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    Start_Year_Month: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    End_Year_Month: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Annual_leave: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    Earned_Leave: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Govt_Leave: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Hr_Leave_Register',
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
        name: "FK_Dept",
        using: "BTREE",
        fields: [
          { name: "DeptID" },
        ]
      },
    ]
  });
};

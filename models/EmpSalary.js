const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EmpSalary', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Empid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CurrentSalary: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Year: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Month: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UpdatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'EmpSalary',
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

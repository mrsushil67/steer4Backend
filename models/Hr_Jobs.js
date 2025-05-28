const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Hr_Jobs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    MinSal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    MaxSal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Dept: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Hr_Jobs',
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
        name: "JobDept",
        using: "BTREE",
        fields: [
          { name: "Dept" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DSalUpdates', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Driver: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NewSalary: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    OldSalary: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    OldLocation: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NewLocation: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SalaryUpdateBY: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    SalaryUpadeByOps: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    LocationUpdateBy: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DSalUpdates',
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
    ]
  });
};

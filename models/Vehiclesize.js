const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Vehiclesize', {
    size_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    size: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    size_title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    EMI: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    AVG: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    MplMileage: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Salary: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Vehiclesize',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "size_id" },
        ]
      },
      {
        name: "size_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "size_id" },
        ]
      },
    ]
  });
};

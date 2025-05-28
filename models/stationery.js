const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stationery', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    empId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Remark: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    quantity: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    product: {
      type: DataTypes.STRING(75),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(11),
      allowNull: true,
      defaultValue: "1"
    },
    RemarkByHr: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(75),
      allowNull: true
    },
    RequestNo: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    givenQty: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'stationery',
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

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Work_details', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    PartName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    PartNo: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    PartPrize: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    Remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Created_By: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gst: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Work_details',
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

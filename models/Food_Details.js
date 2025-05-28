const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Food_Details', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    SNo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Vehicle_number: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    Driver_Name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Dl_Number: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Provided_Date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    Remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Tripno: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Created_By: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Depot: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    diver_option: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    HoldFrom: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    HoldTo: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Food_Details',
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

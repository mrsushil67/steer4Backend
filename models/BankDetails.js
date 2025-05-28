const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BankDetails', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_type: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    Bank_Name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Branch_Name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Branch_Address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Name_as_in_Account: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Account_Type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Account_No: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    IFSC_Code: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'BankDetails',
    timestamps: false,
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

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    User_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    First_Name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Last_Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Profile_IMG: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    Created_Time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Modified_Time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    User_Type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    AvailableTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Is_Assigned: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    officeId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ShowPassword: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'Users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "User_ID" },
        ]
      },
      {
        name: "User_ID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "User_ID" },
        ]
      },
      {
        name: "User_Type",
        using: "BTREE",
        fields: [
          { name: "User_Type" },
        ]
      },
    ]
  });
};

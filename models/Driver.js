const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Driver', {
    DriverID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    DFatherName: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    MotherName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Licence: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "Licence"
    },
    VClass: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Phone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Address: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    Aadhar: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    DriverProfile: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CityId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    RtoName: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    DOJ: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    IssueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ExpDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DOB: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Salary: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    reference: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    location: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    CreatedBy: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Is_ambulance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    is_verified: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    Dtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    DORJ: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Is_MilkRun: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    Dcat: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    BlockStataus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    BlockBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BlockDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    LadgerType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UpdateBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UpdateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UserType: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    pan_no: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Driver',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DriverID" },
        ]
      },
      {
        name: "DriverID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DriverID" },
        ]
      },
      {
        name: "Licence",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Licence" },
        ]
      },
      {
        name: "FKLocation",
        using: "BTREE",
        fields: [
          { name: "location" },
        ]
      },
    ]
  });
};

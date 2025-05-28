const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DriverSalary', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DriverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Month: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Stat: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    BankDT: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PresentDays: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ToPaySal: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    Dsalary: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    CheckSal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Advance: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    TollDebit: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    FuelDebit: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    OPSdebit: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    OtherDeduction: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    ContributionAmt: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    TotalDeduction: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    ActualSal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Remark: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    Location: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DLocation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Is_submission: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    SalRemark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_hide: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    SalaryUpdateBy: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    LocationUpdateBy: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    SalaryUpdateDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    LocationUpdateDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Is_MilkRun: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    SalCalulateBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DriverSalary',
    hasTrigger: true,
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
      {
        name: "DriverId",
        using: "BTREE",
        fields: [
          { name: "DriverId" },
        ]
      },
      {
        name: "Month",
        using: "BTREE",
        fields: [
          { name: "Month" },
        ]
      },
      {
        name: "Year",
        using: "BTREE",
        fields: [
          { name: "Year" },
        ]
      },
      {
        name: "Dsalary",
        using: "BTREE",
        fields: [
          { name: "Dsalary" },
        ]
      },
      {
        name: "DLocation",
        using: "BTREE",
        fields: [
          { name: "DLocation" },
        ]
      },
    ]
  });
};

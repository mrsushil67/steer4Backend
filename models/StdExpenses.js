const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('StdExpenses', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Vsize: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    VSizeCat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Mileage: {
      type: DataTypes.DOUBLE(5,2),
      allowNull: true
    },
    VehicleCnt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DriverCnt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TripType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    RouteType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DieselQTY: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    DieselAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Fastag: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    McdToll: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TollCash: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    RunningAMT: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Advance: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    DriverQTY: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    DriverSalary: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TotalDriverSalary: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    EMI: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TotalEMI: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    MaintCost: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    AdminCost: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    SaleValue: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    DetentionAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    StdTat: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Kms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DieselRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Profit: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Expenses: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    DipoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    StdCat: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    CreatedDT: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    UpdatedDT: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    UpdtBy: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'StdExpenses',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "ID",
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "RouteId",
        using: "BTREE",
        fields: [
          { name: "RouteId" },
        ]
      },
    ]
  });
};

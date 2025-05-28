const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CustRateMap', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CustomerMaster',
        key: 'CustId'
      }
    },
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'RouteMaster',
        key: 'RouteId'
      }
    },
    RouteType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CustomerSeviceType',
        key: 'Id'
      }
    },
    TripType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TripType',
        key: 'Id'
      }
    },
    Distance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    TAT: {
      type: DataTypes.FLOAT(10,2),
      allowNull: false,
      defaultValue: 0.00
    },
    RTAT: {
      type: DataTypes.FLOAT(10,2),
      allowNull: true
    },
    RDistance: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    VehicleSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    VehicleCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Rate: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      defaultValue: 0.00
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Is_Final: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    image: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    DocRef: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    RouteString: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Is_Standard: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    SFixedAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    SFixedDiesel: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    StdMilage: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    BaseRate: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    IS_FSC: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    UpdateBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UpdateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    RatePerKm: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    FscPer: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CustRateMap',
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
        name: "ID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "CustId",
        using: "BTREE",
        fields: [
          { name: "CustId" },
        ]
      },
      {
        name: "RouteId",
        using: "BTREE",
        fields: [
          { name: "RouteId" },
        ]
      },
      {
        name: "RouteType",
        using: "BTREE",
        fields: [
          { name: "RouteType" },
        ]
      },
      {
        name: "TripType",
        using: "BTREE",
        fields: [
          { name: "TripType" },
        ]
      },
      {
        name: "VehicleSize",
        using: "BTREE",
        fields: [
          { name: "VehicleSize" },
        ]
      },
      {
        name: "IS_FSC",
        using: "BTREE",
        fields: [
          { name: "IS_FSC" },
        ]
      },
    ]
  });
};

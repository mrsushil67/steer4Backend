const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TripPlan', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RouteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TripType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    VehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Driver1Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Driver2Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    VPlaceTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    DepartureTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Remark: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    TripSheet: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "TripSheet_UNIQUE"
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    Is_Amended: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    AmendReason: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ParentTripNo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    BookingType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PlanCat: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    Is_Completed: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    Is_Settled: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Is_Verified: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    Tcat: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    BrId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Is_peak: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TripPlan',
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
        name: "TripSheet_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TripSheet" },
        ]
      },
      {
        name: "fk_TripPlan_1_idx",
        using: "BTREE",
        fields: [
          { name: "CustId" },
        ]
      },
      {
        name: "fk_TripPlan_2_idx",
        using: "BTREE",
        fields: [
          { name: "VehicleId" },
        ]
      },
      {
        name: "fk_TripPlan_3_idx",
        using: "BTREE",
        fields: [
          { name: "Driver1Id" },
        ]
      },
      {
        name: "fk_TripPlan_5_idx",
        using: "BTREE",
        fields: [
          { name: "RouteId" },
        ]
      },
      {
        name: "fk_TripPlan_6_idx",
        using: "BTREE",
        fields: [
          { name: "AmendReason" },
        ]
      },
      {
        name: "Is_Settled",
        using: "BTREE",
        fields: [
          { name: "Is_Settled" },
        ]
      },
      {
        name: "Is_Verified",
        using: "BTREE",
        fields: [
          { name: "Is_Verified" },
        ]
      },
      {
        name: "Is_Completed",
        using: "BTREE",
        fields: [
          { name: "Is_Completed" },
        ]
      },
      {
        name: "Is_Amended",
        using: "BTREE",
        fields: [
          { name: "Is_Amended" },
        ]
      },
      {
        name: "Status",
        using: "BTREE",
        fields: [
          { name: "Status" },
        ]
      },
    ]
  });
};

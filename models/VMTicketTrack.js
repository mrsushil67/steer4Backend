const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VMTicketTrack', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TickedID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    InforcedTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    WorkshopName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    WorkShopAuth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    WorkShopLocation: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    WorkShopPhone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    Attender: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ActionTaken: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    OldTyreSr: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    DriverContactT: {
      type: DataTypes.DATE,
      allowNull: false
    },
    WorkstartT: {
      type: DataTypes.DATE,
      allowNull: false
    },
    WorkDoneT: {
      type: DataTypes.DATE,
      allowNull: false
    },
    PaymentdoneT: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Expenses: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    WorkDoneBy: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Remarks: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    InfWthDrvrTat: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    DrvrWstartTat: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    InfWDoneTat: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    ActualWTat: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    WrkPayTat: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    ComplaintNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CurrentStatus: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    UpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'VMTicketTrack',
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
        name: "TickedID",
        using: "BTREE",
        fields: [
          { name: "TickedID" },
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
        name: "TickedID_2",
        using: "BTREE",
        fields: [
          { name: "TickedID" },
        ]
      },
    ]
  });
};

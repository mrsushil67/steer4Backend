const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DieselSlip', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    oldtripid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NewTripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DipoId: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Ticket: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "Ticket"
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    Qty: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    Amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    AvgRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    VehicleNo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    vendorid: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    VendorName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      comment: "1.ad\/on 2.mis"
    },
    UpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    TrpCancleStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    PoStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    BookingTYype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "1.cash,2.credit"
    },
    Remark: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    is_approved: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    approved_by: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    approved_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    TripAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DieselSlip',
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
      {
        name: "Ticket",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Ticket" },
        ]
      },
      {
        name: "NewTripId",
        using: "BTREE",
        fields: [
          { name: "NewTripId" },
        ]
      },
      {
        name: "DipoId",
        using: "BTREE",
        fields: [
          { name: "DipoId" },
        ]
      },
      {
        name: "Ticket_2",
        using: "BTREE",
        fields: [
          { name: "Ticket" },
        ]
      },
    ]
  });
};

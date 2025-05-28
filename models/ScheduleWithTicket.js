const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ScheduleWithTicket', {
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
      allowNull: false
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
    TripAmount: {
      type: DataTypes.DOUBLE(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ScheduleWithTicket',
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

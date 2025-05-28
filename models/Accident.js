const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Accident', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Aid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    LogTime: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CloseTime: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TicketId: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Model: {
      type: DataTypes.STRING(59),
      allowNull: true
    },
    Owner: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Maker: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    APlace: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ADate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    AccTime: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    AStory: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    InsCompany: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CPerson: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    LoadStatus: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "1-empty 2 loaded"
    },
    DamageType: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ClamNo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    SpotSurveyor: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SpotDate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    LawyerName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    MoneySent: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Expenses: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    leagelRDate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    WorkShopName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    WorkShopADate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    VehicleCReceived: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "1 Running 2 Towing"
    },
    FinalSurveyor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    FinalSDate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    EAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ESdate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    WorkStartDate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    WorkCDate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    RIDate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    InvoiceAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    InvoiceDate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ASSAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    PaymentReceived: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    OtherRemark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Repair: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Debit_Amt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Release_date: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Status: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "Pending=1, completed=2"
    },
    spotphoto: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    finalsurvey: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    underrepair: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    riimage: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    estimate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    invoice: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    assessment: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    driver: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    vehicle: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    loadpaper: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    medical: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Helper: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Towned: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Difference: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Policy: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Accident',
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

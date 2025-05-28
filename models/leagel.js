const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leagel', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Aid: {
      type: DataTypes.INTEGER,
      allowNull: true
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
      allowNull: true
    },
    AdvocateName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CortName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    FIRNo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    FIRDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    PoliceStation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ReleaseDate: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    BillDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    BillNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Expenses: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    FPAHolder: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Settlement_fee: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Advocate_fee: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Police_fee: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    mvi_fee: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    reason1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    reason1amt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    reason2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    reason3: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    reason4: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    reason5: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    reason2amt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    reason3amt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    reason4amt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    reason5amt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Status: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "Pending=1, completed=2"
    },
    Remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    FronImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    BackImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    LeftImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    RightImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    FronImage_3: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    BackImage_3: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    LeftImage_3: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    RightImage_3: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    LDate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    LTime: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'leagel',
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
    ]
  });
};

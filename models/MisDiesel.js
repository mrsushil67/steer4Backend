const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MisDiesel', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Ticket: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    DipoId: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    Qty: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    Vendor: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fillingDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    givenBy: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    VehicleNo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DieselRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TotalAmt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    reamrk: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    CretaedBy: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_approve: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MisDiesel',
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

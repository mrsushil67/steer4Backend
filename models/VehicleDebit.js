const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VehicleDebit', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    VehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DieselQty: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    SettleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    AdjTripId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Remark: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    UdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UpdatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'VehicleDebit',
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
        name: "FKSettleId",
        using: "BTREE",
        fields: [
          { name: "SettleId" },
        ]
      },
    ]
  });
};

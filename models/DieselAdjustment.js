const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DieselAdjustment', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    OldTripId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NewTripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OldVehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    NewVehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TDiselQty: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Remark: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    OldTripsheet: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    NewTripSheet: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DieselAdjustment',
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
    ]
  });
};

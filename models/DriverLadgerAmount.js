const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DriverLadgerAmount', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DriverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Sid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'DriverLadgerAmount',
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
        name: "DriverId",
        using: "BTREE",
        fields: [
          { name: "DriverId" },
        ]
      },
      {
        name: "Sid",
        using: "BTREE",
        fields: [
          { name: "Sid" },
        ]
      },
    ]
  });
};

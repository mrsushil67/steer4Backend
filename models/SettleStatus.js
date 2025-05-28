const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SettleStatus', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Sid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Ramark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'SettleStatus',
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
        name: "Sid",
        using: "BTREE",
        fields: [
          { name: "Sid" },
        ]
      },
    ]
  });
};

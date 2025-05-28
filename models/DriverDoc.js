const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DriverDoc', {
    DriverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Doc1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Doc2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Doc3: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Doc4: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Doc5: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Doc6: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Doc7: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PanCard: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    BankCopy: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DriverDoc',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DriverId" },
        ]
      },
      {
        name: "DriverId",
        using: "BTREE",
        fields: [
          { name: "DriverId" },
        ]
      },
    ]
  });
};

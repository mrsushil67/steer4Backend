const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OfficeMaster', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    OfficeName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Zip: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Phone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    OfficeAlias: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Lat: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: false
    },
    Long: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: false
    },
    QrCode: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'OfficeMaster',
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
      {
        name: "ID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};

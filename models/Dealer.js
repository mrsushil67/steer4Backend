const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Dealer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DealerName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    DealerCode: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    City: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Sate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    butype: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Pincode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    MobileNo: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Dealer',
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

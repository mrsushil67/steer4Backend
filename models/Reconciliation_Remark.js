const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Reconciliation_Remark', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Tripid: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    TripNo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Invoice: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Reconciliation_Remark',
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

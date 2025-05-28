const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FastTag', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vehicle: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tollplazaname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    originalTxnId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tollTxnDateTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'FastTag',
    timestamps: true,
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

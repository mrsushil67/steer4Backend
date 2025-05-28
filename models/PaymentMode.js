const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PaymentMode', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Mode_Desc: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "Mode_Desc_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'PaymentMode',
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
        name: "Id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
      {
        name: "Mode_Desc_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Mode_Desc" },
        ]
      },
    ]
  });
};

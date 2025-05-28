const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CustomerType', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Type_Desc: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "Type_Desc_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'CustomerType',
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
        name: "Type_Desc_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Type_Desc" },
        ]
      },
    ]
  });
};

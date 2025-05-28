const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ImpBank', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    BankName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    AccountNo: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    Dipo: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ImpBank',
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

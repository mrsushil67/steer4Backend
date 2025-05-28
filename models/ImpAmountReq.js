const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ImpAmountReq', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Dipo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Amount: {
      type: DataTypes.DOUBLE(10,2),
      allowNull: false
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Resion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Remark: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    CrateatedBY: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    Status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ADate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ImpAmountReq',
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
        name: "Dipo",
        using: "BTREE",
        fields: [
          { name: "Dipo" },
        ]
      },
    ]
  });
};

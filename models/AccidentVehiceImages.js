const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AccidentVehiceImages', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Aid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Type: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    ImageName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'AccidentVehiceImages',
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

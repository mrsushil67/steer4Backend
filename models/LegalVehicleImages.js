const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LegalVehicleImages', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Aid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Type: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    ImageName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'LegalVehicleImages',
    timestamps: false,
    indexes: [
      {
        name: "id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

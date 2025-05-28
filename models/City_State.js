const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('City_State', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Pincode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    CityCode: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    CityName: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    StateName: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    StateId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Status: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    StatTitle: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'City_State',
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
    ]
  });
};

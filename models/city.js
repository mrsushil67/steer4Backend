const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('city', {
    CityId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CityName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Code: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "Code"
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'states',
        key: 'id'
      }
    },
    LType: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    DepoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    SubDipoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Country: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    long: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    customer: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'city',
    timestamps: true,
    indexes: [
      {
        name: "CityId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CityId" },
        ]
      },
      {
        name: "Code",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Code" },
        ]
      },
      {
        name: "fk_city_1_idx",
        using: "BTREE",
        fields: [
          { name: "stateId" },
        ]
      },
    ]
  });
};

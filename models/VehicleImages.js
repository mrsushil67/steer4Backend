const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VehicleImages', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Vid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Roadissuedate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    roadduedate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Npissuedate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Npduedate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fitissuedate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Fitduedate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    GPissue: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    GPDue: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Insissuedate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Insduedate: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'VehicleImages',
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

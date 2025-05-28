const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BlueDartAdhocTrip', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    LaNo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    VDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    vehid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    VehclelodingC: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    d1Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    d2Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    from: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    To: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    AuthorisedName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'BlueDartAdhocTrip',
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

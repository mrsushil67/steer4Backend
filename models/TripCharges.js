const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TripCharges', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TripAmt: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false
    },
    ExtraKms: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    Detention: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    Overweight: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    Load: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    FOV: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    Hamali: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    DoorDilevery: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    Toll: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    OtherChrgS: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    TotalChargeAmount: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false
    },
    SubTotal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    GstAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    TotalAmt: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    KM: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TripCharges',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "ID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "ID",
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};

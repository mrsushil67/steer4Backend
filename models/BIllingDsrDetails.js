const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BIllingDsrDetails', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TripID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Freight: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    KM: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    RatePerKm: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    DBaseRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Mileage: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    RevisedRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    FSC: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    GTax: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    OtherCharages: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Total: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Is_final: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Discount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BIllingDsrDetails',
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
        name: "TripID",
        using: "BTREE",
        fields: [
          { name: "TripID" },
        ]
      },
    ]
  });
};

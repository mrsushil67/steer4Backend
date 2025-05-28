const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VendorDiesel', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    VcId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Vid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    routeString: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CustomerName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    TripSheet: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    VNumer: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    DieselDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Location: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    DieselQty: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false
    },
    Rate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    BN: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Total: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    GST: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Ftotal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    Type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    Ticket: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'VendorDiesel',
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
        name: "VcId",
        using: "BTREE",
        fields: [
          { name: "VcId" },
        ]
      },
      {
        name: "Vid",
        using: "BTREE",
        fields: [
          { name: "Vid" },
        ]
      },
      {
        name: "Ticket",
        using: "BTREE",
        fields: [
          { name: "Ticket" },
        ]
      },
    ]
  });
};

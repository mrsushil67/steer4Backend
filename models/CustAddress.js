const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CustAddress', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CustId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    City: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    State: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    StateId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Pin: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Address1: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Address2: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    GSTNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    GSTName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    IsInvoice: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    StateCode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PanNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    WorkOrder: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CustAddress',
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
        name: "Id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};

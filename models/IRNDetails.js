const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IRNDetails', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    InvId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    AckNo: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    AckDt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Irn: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    QRCodeUrl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    EinvoicePdf: {
      type: DataTypes.TEXT,
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
    Status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    CancelDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    User_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'IRNDetails',
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
      {
        name: "InvId",
        using: "BTREE",
        fields: [
          { name: "InvId" },
        ]
      },
    ]
  });
};

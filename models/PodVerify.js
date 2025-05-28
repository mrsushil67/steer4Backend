const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PodVerify', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TripId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_verify: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    Remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    TripSheet: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PodVerify',
    timestamps: true,
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
        name: "TripId",
        using: "BTREE",
        fields: [
          { name: "TripId" },
        ]
      },
      {
        name: "sid",
        using: "BTREE",
        fields: [
          { name: "sid" },
        ]
      },
    ]
  });
};

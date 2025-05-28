const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VehicleAssignToCust', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    OldCustId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NewCustId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Vid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AssignBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AssignTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'VehicleAssignToCust',
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
    ]
  });
};

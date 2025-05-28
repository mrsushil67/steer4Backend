const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Emp_Doc', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Emp_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Image1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Image2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Image3: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Image4: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Image5: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Image6: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Image7: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Image8: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Image9: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Image10: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Emp_Doc',
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

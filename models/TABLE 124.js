const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TABLE 124', {
    'COL 1': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    'COL 2': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    'COL 3': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    prt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Tvhl: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TABLE 124',
    timestamps: false
  });
};

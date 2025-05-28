const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('text', {
    sid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Remark: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'text',
    timestamps: false
  });
};

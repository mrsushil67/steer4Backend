const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IssueTicketSubCat', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Ticketid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Category: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SubCategory: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'IssueTicketSubCat',
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
        name: "Ticketid",
        using: "BTREE",
        fields: [
          { name: "Ticketid" },
        ]
      },
      {
        name: "Category",
        using: "BTREE",
        fields: [
          { name: "Category" },
        ]
      },
      {
        name: "SubCategory",
        using: "BTREE",
        fields: [
          { name: "SubCategory" },
        ]
      },
    ]
  });
};

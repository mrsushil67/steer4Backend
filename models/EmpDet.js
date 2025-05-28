const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EmpDet', {
    EmpId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    BirthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    LastCompany: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    FatherName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    MotherName: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    AdhharNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Age: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'EmpDet',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EmpId" },
        ]
      },
      {
        name: "EmpId_2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EmpId" },
        ]
      },
      {
        name: "EmpId",
        using: "BTREE",
        fields: [
          { name: "EmpId" },
        ]
      },
    ]
  });
};

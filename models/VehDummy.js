const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VehDummy', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    VNumer: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    DATE: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    EngineNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ChassisNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    InsuranceComp: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    POLICYNO: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    IDV: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    NCB: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Insissuedate: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Insduedate: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Roadissuedate: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    roadduedate: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Npissuedate: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Npduedate: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fitissuedate: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Fitduedate: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    GPissue: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    GPDue: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Premium: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    POLICYtype: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Unladen: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    GVW: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    State: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    VMaker: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    VSegment: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Cargodeck: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    OwnerName: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'VehDummy',
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

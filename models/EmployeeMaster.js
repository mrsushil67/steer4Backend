const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EmployeeMaster', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    emp_code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ProfileImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Dept_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Job_Id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    HiredOn: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Login_Id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ShowPassword: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    Gender: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Office_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    DipoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DeviceId: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    QrCode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    active_status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    Company: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Esi_no: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Pf_no: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Blood_group: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    Pan_No: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Dipo: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Location: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Type: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
      comment: "1.employee 2. manager"
    }
  }, {
    sequelize,
    tableName: 'EmployeeMaster',
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
        name: "id",
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "EmpDept",
        using: "BTREE",
        fields: [
          { name: "Dept_ID" },
        ]
      },
    ]
  });
};

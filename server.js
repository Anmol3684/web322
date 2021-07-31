/*********************************************************************************
* WEB322 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Anmol singh   Student ID: 156800195  Date: 30 July 2021
*
* Online (Heroku) Link: https://webappas.herokuapp.com/
*
********************************************************************************/

const Sequelize = require('sequelize');

var sequelize = new Sequelize('dkohu3gnje2jl', 'qcmgpdfncymfsw', '6e7d17313230badea924754a04f3b09a9ee5c88e4a9fb81326eb67b4207d0d19', {
  host: 'ec2-52-0-67-144.compute-1.amazonaws.com',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: { rejectUnauthorized: false }
    }
});


// Define a "Employee" model
var Employee = sequelize.define('Employee', {
  employeeNum: {
    type: Sequelize.INTEGER,
    primaryKey: true, // use "project_id" as a primary key
    autoIncrement: true  // automatically increment the value
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  SSN: Sequelize.STRING,
  addressStreet: Sequelize.STRING,
  addressCity: Sequelize.STRING,
  addressState: Sequelize.STRING,
  addressPostal: Sequelize.STRING,
  maritalStatus: Sequelize.STRING,
  isManager: Sequelize.BOOLEAN,
  employeeManagerNum: Sequelize.INTEGER,
  status: Sequelize.STRING,
  hireDate: Sequelize.STRING
});

var Department = sequelize.define('Department', {
  departmentId: {
    type: Sequelize.INTEGER,
    primaryKey: true,  
    autoIncrement: true 
  },
  departmentName: Sequelize.STRING
});


Department.hasMany(Employee, { foreignKey: 'department' });

const fs = require("fs");

module.exports.initialize = function () {

  return new Promise(function (resolve, reject) {
    sequelize.authenticate().then(function () {
      resolve("successfully");
    }).catch(function (err) {
      console.log("databse Error : " + err);
      reject("unable to sync the database" + err);
    })

  });
};

module.exports.getAllEmployees = function () {
  return new Promise(function (resolve, reject) {
    Employee.findAll({
      order: ["employeeNum"]
    }).then(function (data) {
      resolve(data);
    }).catch(function () {
      reject("no results returned");
    })
  });
}


module.exports.getManagers = function () {
  return new Promise(function (resolve, reject) {
    Employee.findAll({
      where: { isManager: true }
    }).then(function (data) {
      resolve(data);
    }).catch(function (err) {
      reject("no results returned");
    });
  });
}

module.exports.getDepartments = function () {
  return new Promise(function (resolve, reject) {
    Department.findAll({
      order: ["departmentId"]
    }).then(function (data) {
      resolve(data);
    }).catch(function () {
      reject("no results returned");
    })
  });
};

module.exports.addEmployee = function (employeeData) {

  return new Promise(function (resolve, reject) {
    employeeData.isManager = (employeeData.isManager) ? true : false;

    for (var prop in employeeData) {
      if (employeeData[prop] == "") {
        employeeData[prop] = null;
      }
    }

    Employee.create(employeeData)
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject("unable to create employee");
      });
  });
}

module.exports.getEmployeesByStatus = function (statusId) {
  return new Promise(function (resolve, reject) {
    Employee.findAll({
      where: { status: statusId }
    }).then(function (data) {
      resolve(data);
    }).catch(function (err) {
      reject("no results returned");
    });
  });
};


module.exports.getEmployeesByDepartment = function (departmentId) {
  return new Promise(function (resolve, reject) {
    Employee.findAll({
      where: { department: departmentId }
    }).then(function (data) {
      resolve(data);
    }).catch(function (err) {
      reject("no results returned");
    });
  });
};

module.exports.getEmployeesByManager = function (managerId) {
  return new Promise(function (resolve, reject) {
    Employee.findAll({
      where: { employeeManagerNum: managerId }
    }).then(function (data) {
      resolve(data);
    }).catch(function (err) {
      reject("no results returned");
    });
  });
}


module.exports.getEmployeeByNum = function (empNo) {
  return new Promise(function (resolve, reject) {
    Employee.findAll({
      where: { employeeNum: empNo }
    }).then(function (data) {
      resolve(data[0]);
    }).catch(function (err) {
      reject("no results returned");
    });
  });
};


module.exports.updateEmployee = function (employeeData) {

  return new Promise(function (resolve, reject) {
    employeeData.isManager = (employeeData.isManager) ? true : false;

    for (const prop in employeeData) {
      if (employeeData[prop] == "") {
        employeeData[prop] = null;
      }
    }

    Employee.update(employeeData, {
      where: { employeeNum: employeeData.employeeNum }
    }).then(function () {
      resolve();
    }).catch(function () {
      reject("unable to create employee");
    });
  });
};


module.exports.addDepartment = function (departmentData) {

  return new Promise(function (resolve, reject) {

    for (var prop in departmentData) {
      if (departmentData[prop] == "") {
        departmentData[prop] = null;
      }
    }
    Department.create(departmentData)
      .then(function () {
        resolve();
      })
      .catch(function () {
        reject("unable to create department");
      });
  });
}

module.exports.updateDepartment = function (departmentData) {

  return new Promise(function (resolve, reject) {

    for (var prop in departmentData) {
      if (departmentData[prop] == "") {
        departmentData[prop] = null;
      }
    }

    Department.update(departmentData, {
      where: { departmentId: departmentData.departmentId }
    }).then(function (data) {
      resolve();
    }).catch(function () {
      reject("unable to create department");
    });
  });
};

module.exports.getDepartmentById = function (id) {
  return new Promise(function (resolve, reject) {
    Department.findAll({
      where: { departmentId: id }
    }).then(function (data) {
      resolve(data[0]);
    }).catch(function () {
      reject("no results returned");
    });
  });
};

module.exports.deleteDepartmentById = function (id) {
  return new Promise(function (resolve, reject) {
    Department.destroy({
      where: { departmentId: id }
    }).then(function (data) {
      resolve("destroyed");
    }).catch(function () {
      reject("no results returned");
    })
  });
}

module.exports.deleteEmployeeByNum = function (empNum) {
  return new Promise(function (resolve, reject) {
    Employee.destroy({
      where: { employeeNum: empNum }
    }).then(function () {
      resolve();
    }).catch(function () {
      reject("unable to delete employee");
    });
  });
}
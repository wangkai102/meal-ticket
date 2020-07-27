'use strict';

const { Service } = require('egg');

class EmployeeService extends Service {
  async find({ openid, empId }) {
    const search = openid ? { openid } : { empId };
    const employee = await this.app.mysql.get('employee', search);
    return employee;
  }

  async bind(newData) {
    const result = await this.app.mysql.update('employee', newData);
    console.log(result);
    return result;
  }
}

module.exports = EmployeeService;

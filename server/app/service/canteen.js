'use strict';

const { Service } = require('egg');

class CanTeenService extends Service {
  async get() {
    const employee = await this.app.mysql.get('employee');
    return employee;
  }

  async bind(newData) {
    const result = await this.app.mysql.update('employee', newData);
    console.log(result);
    return result;
  }
}

module.exports = CanTeenService;

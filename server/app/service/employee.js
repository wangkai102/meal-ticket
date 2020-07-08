'use strict';

const { Service } = require('egg');

class EmployeeService extends Service {
  async find(openid) {
    console.log(this.app);
    const user = await this.app.mysql.get('employee', { openid });
    console.log(user);
    return {
      user,
    };
  }
}

module.exports = EmployeeService;

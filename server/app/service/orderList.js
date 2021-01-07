'use strict';

const { Service } = require('egg');

class OrderListService extends Service {
  async insertOrder(newData) {
    const result = await this.app.mysql.insert('order_list', newData);
    return {
      id: result.insertId,
    };
  }

  async getEmployeeOrder(empId) {
    const result = await this.app.mysql.select('order_list', {
      where: { employee_id: empId },
    });
    console.log(result);
    return result;
  }
}

module.exports = OrderListService;

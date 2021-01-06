'use strict';

const { Service } = require('egg');

class OrderListService extends Service {
  async insertOrder(newData) {
    const result = await this.app.mysql.insert('order_list', newData);
    return {
      id: result.insertId,
    };
  }
}

module.exports = OrderListService;

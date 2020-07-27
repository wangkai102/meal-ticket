'use strict';

const { Service } = require('egg');

class CanTeenService extends Service {
  async getAll() {
    const canteenList = await this.app.mysql.select('canteen');
    return canteenList;
  }

}

module.exports = CanTeenService;

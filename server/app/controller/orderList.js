'use strict';
const Controller = require('egg').Controller;
const dayjs = require('dayjs');
const { resultObj } = require('../utils/utils');

class OrderList extends Controller {
  async submit() {
    const { ctx, app } = this;
    const {
      request: { body },
      service,
      state: { empId },
    } = ctx;
    const { canteenId, canteenName, eatTime, eatDate } = body;
    // console.log(empId);
    const result = await service.orderList.insertOrder({
      employee_id: empId,
      canteen_id: canteenId,
      canteen_name: canteenName,
      eat_time: eatTime,
      eat_date: eatDate,
      create_time: dayjs().valueOf(),
    });
    if (result.id) {
      ctx.body = JSON.stringify(
        resultObj({
          code: 0,
          data: {
            id: result.id,
          },
          msg: '',
        })
      );
    }
  }

  async get() {
    const { ctx, app } = this;
    const {
      state: { empId },
    } = ctx;

    const result = await this.service.orderList.getEmployeeList(empId);
    ctx.body = resultObj({
      code: 0,
      data: result,
      msg: '',
    });
  }
}

module.exports = OrderList;

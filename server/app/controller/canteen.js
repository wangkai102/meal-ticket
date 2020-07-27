'use strict';
const Controller = require('egg').Controller;

function resultObj({ code, data, msg }) {
  return {
    code,
    data,
    msg,
  };
}

class CanteenController extends Controller {
  async get() {
    const { ctx } = this;
    const { service } = ctx;
    const result = await service.canteen.getAll();
    ctx.body = resultObj({
      code: 0,
      data: result,
      msg: '',
    });
  }
}

module.exports = CanteenController;

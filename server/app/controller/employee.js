'use strict';
const Controller = require('egg').Controller;

class EmployeeController extends Controller {
  async login() {
    const { ctx } = this;
    const {
      request: { body },
      service,
    } = ctx;

    const result = await service.weChat.login(body.code);
    if (result.errmsg) {
      ctx.body = JSON.stringify({
        code: 1,
        msg: result.errmsg,
      });
      return;
    }

    const employee = await service.employee.find(result.openid);
    if (!employee.user) {
      ctx.body = JSON.stringify({
        code: 1,
        data: {
          openid: result.openid,
        },
        msg: '未绑定员工账户',
      });
      return;
    }

    ctx.body = 'hi, egg';
  }
}

module.exports = EmployeeController;

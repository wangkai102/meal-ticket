'use strict';
const Controller = require('egg').Controller;

function resultObj({ code, data, msg }) {
  return {
    code,
    data,
    msg,
  };
}

class EmployeeController extends Controller {
  async login() {
    const { ctx, app } = this;
    const {
      request: { body },
      service,
    } = ctx;

    const result = await service.weChat.login(body.code);
    if (result.errmsg) {
      ctx.body = JSON.stringify(
        resultObj({
          code: 1,
          msg: result.errmsg,
        })
      );
      return;
    }

    const employee = await service.employee.find({ openid: result.openid });
    if (employee) {
      const token = app.jwt.sign(
        {
          empId: employee.id,
        },
        app.config.jwt.secret
      );
      delete employee.openid;
      ctx.body = JSON.stringify(
        resultObj({
          code: 0,
          data: {
            ...employee,
            token,
          },
          msg: '未绑定员工账户',
        })
      );
    } else {
      ctx.body = JSON.stringify(
        resultObj({
          code: 1,
          data: {
            openid: result.openid,
          },
          msg: '未绑定员工账户',
        })
      );
    }
  }

  async bind() {
    const { ctx, app } = this;
    const {
      request: { body },
      service,
    } = ctx;
    const { openid, empId } = body;
    // 查询是否已经存在
    const openidRes = await service.employee.find({ openid });
    if (openidRes) {
      ctx.body = JSON.stringify(
        resultObj({
          code: 1,
          msg: '该员工以绑定，请联系管理员解绑',
        })
      );
      return;
    }
    // 查询员工是否存在
    const empIdRes = await service.employee.find({ empId });
    if (empIdRes) {
      const result = await service.employee.bind({ ...empIdRes, openid });
      console.log(result);
      const token = app.jwt.sign(
        {
          empId,
        },
        app.config.jwt.secret
      );
      delete empIdRes.openid;
      ctx.body = JSON.stringify({
        code: 0,
        data: {
          ...empIdRes,
          token,
        },
        msg: '绑定成功',
      });
    } else {
      ctx.body = JSON.stringify(
        resultObj({
          code: 1,
          msg: '请输入正确的员工号码',
        })
      );
    }
  }
}

module.exports = EmployeeController;

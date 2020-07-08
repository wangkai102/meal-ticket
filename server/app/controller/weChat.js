'use strict';

const Controller = require('egg').Controller;

class WeChatController extends Controller {
  async login() {
    const { ctx } = this;
    const {
      request: { body },
      service,
    } = ctx;
    console.log(body);
    const result = await service.weChat.login(body.code);
    console.log(result);
    ctx.body = 'hi, egg';
  }
}

module.exports = WeChatController;

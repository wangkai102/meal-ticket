'use strict';

const { Service } = require('egg');
const axios = require('axios');

class WeChatService extends Service {
  async getIdAndSercet() {
    const id = await this.app.mysql.get('config', 'APP_ID');
    const secret = await this.app.mysql.get('config', 'APP_SECRET');
    return {
      id,
      secret,
    };
  }

  async login(code) {
    const miniApp = await this.getIdAndSercet();
    const result = await axios({
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${miniApp.id}&secret=${miniApp.secret}&js_code=${code}&grant_type=authorization_code`,
    });

    return result.data;
  }
}

module.exports = WeChatService;

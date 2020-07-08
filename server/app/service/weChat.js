'use strict';

const { Service } = require('egg');
const axios = require('axios');

class WeChatService extends Service {
  async login(code) {
    const miniApp = {
      id: 'wx068a1aabd1d8e02c',
      secret: 'ea2423598da91493a43d9a01eade9637',
    };

    const result = await axios({
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${miniApp.id}&secret=${miniApp.secret}&js_code=${code}&grant_type=authorization_code`,
    });

    return result.data;
  }
}

module.exports = WeChatService;

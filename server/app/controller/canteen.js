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
  async get() {}
}

module.exports = CanteenController;

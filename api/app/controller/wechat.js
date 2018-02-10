'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * test() {
    const { wechatApi } = this;

    try {
      const ticket = yield wechatApi.getTicket();
      this.status = 200;
      this.body = ticket;

    } catch (error) {
      this.status = 500;
      this.body = error;
    }
  }
}
module.exports = Controller;

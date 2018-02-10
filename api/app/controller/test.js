'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * test() {
    const { ctx, service } = this;
    ctx.done();
  }
}
module.exports = Controller;

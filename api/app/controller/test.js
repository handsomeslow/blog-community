'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * test() {
    const { ctx, service } = this;
    ctx.done('jun19890827');
  }
}
module.exports = Controller;

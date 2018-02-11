'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * test() {
    const { ctx, service } = this;
    const models = yield service.wechat.updateConfig();
    ctx.done(models);
  }

  * getsignature() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const url = body.url;
    const models = yield service.wechat.getsignature(url);
    ctx.done(models);
  }

  * updateConfig() {
    const { ctx, service } = this;
    const models = yield service.wechat.updateConfig();
    ctx.done(models);
  }
}
module.exports = Controller;

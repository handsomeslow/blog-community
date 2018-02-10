'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * index() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const models = yield service.news.getAll(query);
    ctx.done(models);
  }
  * show() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.news.getById(id);
    ctx.done(model);
  }
  * create() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    if (!ctx.user_id) {
      return ctx.fail(0);
    }
    body.owner = ctx.user_id;
    body.owner_id = ctx.user_id;
    const model = yield service.news.create(body);
    ctx.done(model);
  }
  * update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.news.getById(id);
    if (ctx.session.user.level < 2) {
      return ctx.fail(0);
    }
    const body = ctx.request.body;
    delete body.owner;
    yield service.news.updateById(id, body);
    ctx.done();
  }
  * destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    if (ctx.session.user.level < 2) {
      return ctx.fail(0);
    }
    yield service.news.deleteById(id);
    ctx.done();
  }

}
module.exports = Controller;

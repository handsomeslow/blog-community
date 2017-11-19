'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * index() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const models = yield service.comment.getAll(query);
    ctx.done(models);
  }
  * show() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.comment.getById(id);
    ctx.done(model);
  }
  * create() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    ctx.validate({ topic_id: { type: 'string' }, content: { type: 'string' } });
    if (!ctx.user_id) {
      return ctx.fail(0, '麻烦登陆一下！');
    }
    body.owner = ctx.user_id;
    const model = yield service.comment.create(body);
    ctx.done(model);
  }
  * destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.comment.getById(id);
    if (!ctx.user_id || ctx.user_id !== model.owner.toString()) {
      return ctx.fail(0, '麻烦登陆一下！');
    }
    yield service.comment.deleteById(id);
    ctx.done();
  }
  * up() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const id = query.id;
    yield service.comment.upById(id);
    ctx.success(1,'success');
  }
}
module.exports = Controller;

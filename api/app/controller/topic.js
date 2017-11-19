'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * index() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const models = yield service.topic.getAll(query);
    ctx.done(models);
  }
  * show() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.topic.getById(id);
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
    const model = yield service.topic.create(body);
    ctx.done(model);
  }
  * update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.topic.getById(id);
    if (model && model.owner && model.owner._id.toString() !== ctx.user_id) {
      return ctx.fail(0);
    }
    const body = ctx.request.body;
    delete body.owner;
    yield service.topic.updateById(id, body);
    ctx.done();
  }
  * destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.topic.getById(id);
    if (model.owner._id.toString() !== ctx.user_id) {
      return ctx.fail(0);
    }
    yield service.topic.deleteById(id);
    ctx.done();
  }
  * showUser() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const user_id = ctx.session.user._id;
    query.owner_id = user_id;
    const models = yield service.topic.getByUserId(query);
    ctx.done(models);
  }

}
module.exports = Controller;

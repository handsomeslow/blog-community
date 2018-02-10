'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * index() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const models = yield service.couple.getAll(query);
    ctx.done(models);
  }
  * show() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.couple.getById(id);
    ctx.done(model);
  }
  * create() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    if (!ctx.user_id) {
      return ctx.fail(1000);
    }
    body.owner = ctx.user_id;
    body.owner_id = ctx.user_id;
    body.avatar = yield service.upload.singleUpload('headerimage',body.headerImage);
    const model = yield service.couple.create(body);
    ctx.done(model);
  }
  * update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.couple.getById(id);
    if (model && model.owner && model.owner._id.toString() !== ctx.user_id) {
      return ctx.fail(1000);
    }
    const body = ctx.request.body;
    delete body.owner;
    yield service.couple.updateById(id, body);
    ctx.done();
  }
  * destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    if (ctx.session.user.level < 2) {
      const model = yield service.couple.getById(id);
      if (model.owner != null && model.owner._id.toString() !== ctx.user_id) {
        return ctx.fail(1000);
      }
    }
    yield service.couple.deleteById(id);
    ctx.done();
  }
  * showUser() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const user_id = ctx.session.user._id;
    query.owner_id = user_id;
    const models = yield service.couple.getByUserId(query);
    ctx.done(models);
  }

}
module.exports = Controller;

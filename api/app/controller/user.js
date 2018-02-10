'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * index() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const models = yield service.user.getAll(query);
    ctx.done(models);
  }
  * show() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.user.getById(id);

    if (!model.avatar_url) {
      model.avatar_url='https://dn-ynhurit3.qbox.me/d6b15b52f814f3031e61.jpg'
    }
    ctx.done(model);
  }
  * create() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const model = yield service.user.create(body);
    ctx.done(model);
  }
  * update() {
    const { ctx, service } = this;
    const id = ctx.user_id;
    const body = ctx.request.body;
    const { old_password } = body;
    let model = yield service.user.getById(id);
    if (model.password !== old_password) {
      return ctx.fail(1002);
    }
    model = yield service.user.updateById(id, body);
    ctx.done();
  }
  * destroy() {
    const { ctx, service } = this;
    const id = ctx.user_id;
    yield service.user.updateById(id, { $set: { status: false } });
    ctx.done();
  }
  * collect() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const id = query.topic_id;
    if (!ctx.user_id) {
      return ctx.fail(1000);
    }
    let isSuccess = yield service.user.collectTopic(id);
    if (isSuccess) {
      return ctx.done('收藏成功');
    } else {
      return ctx.fail(0, '收藏失败');
    }
    
  }

  * decollect() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const id = query.topic_id;
    if (!ctx.user_id) {
      return ctx.fail(1000);
    }
    let isSuccess = yield service.user.decollectTopic(id);
    if (isSuccess) {
      return ctx.done('取消收藏成功');
    } else {
      return ctx.fail(0, '取消收藏失败');
    }
  }
}
module.exports = Controller;
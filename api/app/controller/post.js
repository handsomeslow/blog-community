'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * index() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const models = yield service.post.getAll(query);
    ctx.done(models);
  }
  * show() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.post.getById(id);
    ctx.done(model);
  }
  * create() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    if (!ctx.user_id) {
      return ctx.fail(1000);
    }
    //const image_type = body.images.type;
    // const files = [];
    // for (var i = 0; i < body.images.size; i++) {  
    //     var fileNameTemp = body.images.imgData[i].substring(0,20);
    //     var startC = fileNameTemp.indexOf('/')+1
    //     var endC = fileNameTemp.indexOf(';')
    //     var filesuffix
    //     if (startC>0 && endC>startC ) {
    //       filesuffix = fileNameTemp.substring(startC,endC)
    //     }
    //     var base64Data = body.images.imgData[i].replace(/^data:image\/\w+;base64,/, "");
    //     if (base64Data.length > 0) {
    //       var dataBuffer = new Buffer(base64Data, 'base64');
    //       var result = yield client.put('images/'+type+'/'+new Date().getTime()+'.'+filesuffix, dataBuffer);
    //       if (result.url != null && result.url != '') {
    //         files.push(result.url);
    //       }
    //   }
    // }
    body.owner = ctx.user_id;
    body.owner_id = ctx.user_id;
    body.couple = body.couple_id;
    body.images = yield service.upload.upload(body.imgSize,'grow',body.imgData);
    const model = yield service.post.create(body);
    ctx.done(model);
  }
  * update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.post.getById(id);
    if (model && model.owner && model.owner._id.toString() !== ctx.user_id) {
      return ctx.fail(1000);
    }
    const body = ctx.request.body;
    delete body.owner;
    yield service.post.updateById(id, body);
    ctx.done();
  }
  * destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    if (ctx.session.user.level < 2) {
      const model = yield service.post.getById(id);
      if (model.owner != null && model.owner._id.toString() !== ctx.user_id) {
        return ctx.fail(1000);
      }
    }
    yield service.post.deleteById(id);
    ctx.done();
  }
  * showUser() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const user_id = ctx.session.user._id;
    query.owner_id = user_id;
    const models = yield service.post.getByUserId(query);
    ctx.done(models);
  }

}
module.exports = Controller;

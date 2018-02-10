'use strict';
const BaseController = require('egg').Controller;
const fs = require('fs');

class Controller extends BaseController {
  * test() {
    const { ctx, service } = this;
    ctx.done();
  }

  * getInfo() {
    const { ctx, service } = this;
    var file="./data/lotteryInfo.json";
    var result=JSON.parse(fs.readFileSync( file));
    ctx.done(result);
  }

  * prizeInfo() {
    const { ctx, service } = this;
    var file="./data/prizeInfo.json";
    var result=JSON.parse(fs.readFileSync( file));
    ctx.done(result);
  }

  * recordInfo() {
    const { ctx, service } = this;
    var file="./data/lotteryRecord.json";
    var result=JSON.parse(fs.readFileSync( file));
    ctx.done(result);
  }
}
module.exports = Controller;

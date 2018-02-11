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
    var result=JSON.parse(fs.readFileSync(file));
    ctx.done(result);
  }

  * prizeInfo() {
    const { ctx, service } = this;
    var num = new Array(8,8,8,3,3,4,3,8,4,8,3,3);
    var index = parseInt(10*Math.random())
    var s = num[index]
    if (s == 4) {
      var result = {
        level:s,
        picUrlWinning:"http://lottery.grow666.com/images/20180211150931.jpg",
        commodityName:"木质城堡20元优惠券"
      }
    } else {
      var result = {
        level:s,
        picUrlWinning:"http://lottery.grow666.com/images/20180211150931.jpg",
        commodityName:"未中奖"
      }
    }

    //console.log('s='+s)
    //var file="./data/prizeInfo.json";
    //var result=JSON.parse(fs.readFileSync(file));
    ctx.done(result);
  }

  * recordInfo() {
    const { ctx, service } = this;
    var file="./data/lotteryRecord.json";
    var result=JSON.parse(fs.readFileSync(file));
    ctx.done(result);
  }
}
module.exports = Controller;

'use strict';
const sha1 = require('sha1')

module.exports = app => {
  class Service extends app.Service {
  	// 随机字符串
	createNonceStr() {
	  return Math.random().toString(36).substr(2, 15);
	}

	// 时间戳
	createTimestamp() {
	  return parseInt(new Date().getTime() / 1000) + '';
	}

	// 排序拼接
	raw(args) {
	  var keys = Object.keys(args);
	  keys = keys.sort()
	  var newArgs = {};
	  keys.forEach(function (key) {
	    newArgs[key.toLowerCase()] = args[key];
	  });
	  var string = '';
	  for (var k in newArgs) {
	    string += '&' + k + '=' + newArgs[k];
	  }
	  string = string.substr(1);
	  return string;
	}

  	async updateConfig() {
  		const token = await app.wechatApi.getToken();
  		const ticket = await app.wechatApi.getTicket();
  		return token;
  	}

    async getsignature(url) {
        // let jsapi_ticket = await app.wechatApi.getTicket();
	    // let nonce_str = 'jun19890827'  // 密钥，字符串任意，可以随机生成
	    // let timestamp = new Date().getTime() // 时间戳
	    // let url = 'http://lottery.grow666.com'  // 使用接口的url链接，不包含#后的内容
	 
	    // // 将请求以上字符串，先按字典排序，再以'&'拼接，如下：其中j > n > t > u，此处直接手动排序
	    // let str = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + nonce_str + '×tamp=' + timestamp + '&url=' + url
	 
	    // // 用sha1加密
	    // let signature = sha1(str)
     	// return signature;
      let jsapi_ticket = await app.wechatApi.getTicket();
      //console.log('ticket:'+jsapi_ticket.ticket)
	  var ret = {
	    jsapi_ticket: jsapi_ticket.ticket,
	    nonceStr: this.createNonceStr(),
	    timestamp: this.createTimestamp(),
	    url: url
	  };
	  var string = this.raw(ret);
	  //console.log('str : '+string);
	  ret.signature = sha1(string);
	  ret.appId = 'wx42de759006668be8';
	  return ret;
    }
  }
  return Service;
};

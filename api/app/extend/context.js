'use strict';


const defaultMsg = {
  0: 'Server error!',
  // 登录相关
  1000: '未登录',
  1001:'没有权限',
  1002: '账号或密码错误',
};
module.exports = {
  done(data) {
    this.body = { code: 1, data };
  },
  success(code = 1, msg){
    this.body = { code, msg:msg };
  },
  fail(code = 0, msg) {
    msg = msg || defaultMsg[code];
    this.body = { code, msg };
  },
  get user_id() {
    return this.session.user && this.session.user._id;
  },
  get user_level() {
    return this.session.user && this.session.user.level;
  },
  checkAuth(level) {
    if (!this.session.user || this.session.user.level < level) {
      throw { code: 1001, msg: 'no permission!' };
    }
  },
};

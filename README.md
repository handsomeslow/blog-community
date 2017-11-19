# Blog

## 项目部署
项目分为两部分，前端[www]和后端[api]，同时部署也是分开的。
依赖：

    Node > 7
    Mongodb
    Redis

### api
后端框架是[eggjs](https://github.com/eggjs/egg)，数据库采用mongodb + redis，参数配置可参照下方代码.

```javascript
/**
 * 参数全部从Docker环境变量中获取
 * @argument mongodb_host mongodb的主机地址
 * @argument redis_host redis的主机地址
 * @argument redis_password redis的访问密码
 * @argument redis_db redis的第几号数据库
 */
const mongodb_host = `mongodb://${process.env.mongodb_host || 'localhost'}/blog`;
const redis_host = process.env.redis_host || 'localhost';
const redis_password = process.env.redis_password || '';
const redis_db = process.env.redis_db || 0;
module.exports = {
  logger: {
    dir: './logs',
  },
  security: {
    csrf: false,
  },
  redis: {
    client: {
      port: 6379,
      host: redis_host,
      password: redis_password,
      db: redis_db,
    },
  },
  mongoose: {
    url: mongodb_host,
    options: {},
  },
};
```
参数可以自行修改，配好后，构建环境并启动：
```shell
npm install & npm run debug
# or
yarn install & yarn run debug
```
到这里，后端api就启动成功了，可以直接访问 http://localhost:7001/blog/v1/session ，检查是否启动成功。

### app
后端框架是[vue](https://github.com/vuejs/vue)，采用了[vue-cli](https://github.com/vuejs/vue-cli)，模板采用的是webpack，eslint采用airbnb的.
```javascript
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
/**
 * 参数从Docker环境变量中获取
 * @argument blog_host 后端api地址
 */
const host = process.env.blog_host ? `"${process.env.blog_host}"` : '"https://api.mumuimp.com/blog/v1"';

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  host,
});
```
构建环境并启动：
```shell
npm install & npm run dev
# or
yarn install & yarn run dev
```

## License

[MIT](LICENSE)

const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

const host = process.env.blog_host ? `"${process.env.blog_host}"` : '"http://localhost:7001/blog/v1/"';

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  host,
});

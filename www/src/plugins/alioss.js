var OSS = require('ali-oss')
var co = require('co');

const client = new OSS({
    endpoint: 'img.grow666.com',
    accessKeyId: 'LTAIJOpQCCsC1jvE',
    accessKeySecret: 'A8KBLJjCTxxDqcREWR37d3YbvEmxRW',
    cname: true
});

export default client
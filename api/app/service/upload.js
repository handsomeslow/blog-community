'use strict';

const OSS = require('ali-oss');

const BaseController = require('egg').Controller;
const fs = require('fs');
const path = require('path');

const client = new OSS({
    endpoint: 'img.grow666.com',
    accessKeyId: 'LTAIJOpQCCsC1jvE',
    accessKeySecret: 'A8KBLJjCTxxDqcREWR37d3YbvEmxRW',
    cname: true
});
client.useBucket('jun-ali-oss')

module.exports = app => {
    class Service extends app.BaseService {
        * upload(size, type, imagedata) {
            const files = [];
            for (var i = 0; i < size; i++) {  
                var fileNameTemp = imagedata[i].substring(0,20);
                var startC = fileNameTemp.indexOf('/')+1
                var endC = fileNameTemp.indexOf(';')
                var filesuffix;

                if (startC>0 && endC>startC ) {
                    filesuffix = fileNameTemp.substring(startC,endC)
                }
                var base64Data = imagedata[i].replace(/^data:image\/\w+;base64,/, "");
                if (base64Data.length > 0) {
                    var dataBuffer = new Buffer(base64Data, 'base64');
                    var result = yield client.put('images/'+type+'/'+new Date().getTime()+'.'+filesuffix, dataBuffer);
                    if (result.url != null && result.url != '') {
                      files.push(result.url);
                    }
                }

            }
            return files;
        }

        * singleUpload(type, imagedata) {
            var fileNameTemp = imagedata.substring(0,20);
            var startC = fileNameTemp.indexOf('/')+1
            var endC = fileNameTemp.indexOf(';')
            var filesuffix;

            if (startC > 0 && endC > startC ) {
                filesuffix = fileNameTemp.substring(startC,endC)
            }
            var base64Data = imagedata.replace(/^data:image\/\w+;base64,/, "");
            if (base64Data.length > 0) {
                var dataBuffer = new Buffer(base64Data, 'base64');
                var result = yield client.put('images/'+type+'/'+new Date().getTime()+'.'+filesuffix, dataBuffer);
                if (result.url != null && result.url != '') {
                  return result.url;
                }
            }
        }
      }
      return Service;
};

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

class Controller extends BaseController {
    * show() {
        const { ctx, service } = this;
        //await ctx.render('page/multiple.html');
        var result = yield client.put('images/test7.txt', new Buffer('hello world'));
        return ctx.done(result.url);
    }

    * multipleupload() {
        const { ctx, service } = this;
        const parts = ctx.multipart({ autoFields: true });
        const files = [];
        let stream;
        while ((stream = yield parts()) != null) {
            var filename = stream.filename;
            var extname = path.extname(filename);
            if(extname == '.jpg' ||extname == '.jpeg' || extname == '.bmp' ||extname == '.png') {
                filename = 'images/'+ filename;
            }
            var result = yield client.putStream(filename, stream);
            files.push(result.url);
        }

        return ctx.done(files);
    }

    * bufferupload() {
        const { ctx, service } = this;
        const body = ctx.request.body;
        const type = body.type;
        const files = yield service.upload.upload(body.size,'grow',body.imgData);
        // for (var i = 0; i < body.size; i++) {  
        //     var fileNameTemp = body.imgData[i].substring(0,20);
        //     var startC = fileNameTemp.indexOf('/')+1
        //     var endC = fileNameTemp.indexOf(';')
        //     var filesuffix
        //     if (startC>0 && endC>startC ) {
        //         filesuffix = fileNameTemp.substring(startC,endC)
        //     }
        //     var base64Data = body.imgData[i].replace(/^data:image\/\w+;base64,/, "");
        //     var dataBuffer = new Buffer(base64Data, 'base64');
        //     var result = yield client.put('images/'+type+'/'+new Date().getTime()+'.'+filesuffix, dataBuffer);
        //     files.push(result.url);
        // }
        return ctx.done(files);
    }
}

module.exports = Controller;
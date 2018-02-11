'use strict';

/**
Method  Path              Route Name      Controller.Action
GET     /posts            posts       app.controllers.posts.index
GET     /posts/new        new_post    app.controllers.posts.new
GET     /posts/:id        post        app.controllers.posts.show
GET     /posts/:id/edit   edit_post   app.controllers.posts.edit
POST    /posts            posts       app.controllers.posts.create
PUT     /posts/:id        post        app.controllers.posts.update
DELETE  /posts/:id        post        app.controllers.posts.destroy
**/

const couple_api_version = '/couple/v1/'

module.exports = app => {
  // test
  app.get(couple_api_version+'test', app.controller.test.test);
  app.post(couple_api_version+'wechat/getsignature', app.controller.wechat.getsignature);

  app.delete('blog_api.session', couple_api_version+'session', 'session.destroy');
  app.resources('blog_api.session', couple_api_version+'session', 'session');
  app.resources('blog_api.token', couple_api_version+'token', 'token');

  app.put('blog_api.user', couple_api_version+'user', 'user.update');
  app.resources('blog_api.user', couple_api_version+'user', 'user');
  app.resources('blog_api.comment', couple_api_version+'comment', 'comment');
  app.get('blog_api.usertopic',couple_api_version+'usertopic', app.controller.topic.showUser);
  app.get('blog_api.comment.up',couple_api_version+'comment/up', app.controller.comment.up);

  // topic
  app.resources('blog_api.topic', couple_api_version+'topic', 'topic');
  app.get('blog_api.topic.collect', couple_api_version+'topic/collect', app.controller.user.collect);
  app.get('blog_api.topic.collect', couple_api_version+'topic/decollect', app.controller.user.decollect);

  // news
  app.resources('blog_api.news', couple_api_version+'news', 'news');

  // upload
  app.get(couple_api_version+'upload', app.controller.upload.show);
  app.post(couple_api_version+'upload', app.controller.upload.bufferupload);


  // post
  app.resources('blog_api.post', couple_api_version+'post', 'post');
  app.resources('blog_api.couple', couple_api_version+'couple', 'couple');

  // lottery
  app.get(couple_api_version+'lottery', app.controller.lottery.getInfo);
  app.get(couple_api_version+'prize', app.controller.lottery.prizeInfo);
  app.get(couple_api_version+'record', app.controller.lottery.recordInfo);
};


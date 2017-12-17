'use strict';

module.exports = app => {
  app.delete('blog_api.session', '/blog/v1/session', 'session.destroy');
  app.resources('blog_api.session', '/blog/v1/session', 'session');
  app.resources('blog_api.token', '/blog/v1/token', 'token');

  app.put('blog_api.user', '/blog/v1/user', 'user.update');
  app.resources('blog_api.user', '/blog/v1/user', 'user');
  app.resources('blog_api.comment', '/blog/v1/comment', 'comment');
  app.get('blog_api.usertopic','/blog/v1/usertopic', app.controller.topic.showUser);
  app.get('blog_api.comment.up','/blog/v1/comment/up', app.controller.comment.up);

  // topic
  app.resources('blog_api.topic', '/blog/v1/topic', 'topic');
  app.get('blog_api.topic.collect', '/blog/v1/topic/collect', app.controller.user.collect);
  app.get('blog_api.topic.collect', '/blog/v1/topic/decollect', app.controller.user.decollect);

  // news
  app.resources('blog_api.news', '/blog/v1/news', 'news');
};

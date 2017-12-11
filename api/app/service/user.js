'use strict';
module.exports = app => {
  class Service extends app.BaseService {
    get model() {
      return this.ctx.model.User;
    }

    async login({ username, password }) {
      const model = await this.model.findOne(
        { username, password },
        { username: 1, avatar_url: 1, motto: 1, status: 1, phone: 1 , level: 1 }
      );
      return model;
    }

    // 收藏文章
    async collectTopic(topic_id) {
      const topic = await this.ctx.service.topic.getById(topic_id);
      const model = await this.model.findById(this.ctx.user_id);
      var index = await model.collect_topics.push(topic);
      if (index > 0) {
        model.save();
        return true;
      }
      return false;
    }

    // 取消收藏文章
    async decollectTopic(topic_id) {
      //console.log('topic_id:'+topic_id);
      const topic = await this.ctx.service.topic.getById(topic_id);
      const model = await this.model.findById(this.ctx.user_id);
      var index = model.collect_topics.indexOf(topic_id);
      if (index > -1) {
        await model.collect_topics.splice(index,1);
        model.save()
        return true;
      }
      return false;
    }

    // 检测文章是否收藏
    async checkTopicCollected(topic_id) {
      if (!this.ctx.user_id) {
        return
      }

      const user_collect_topics = await this.model.findById(this.ctx.user_id,{ collect_topics: 1});
      for (var i = 0; i < user_collect_topics.collect_topics.length; i++){
        if (user_collect_topics.collect_topics[i] == topic_id)
            return true;
      }
      return false;
    }

    // 获取用户信息
    async getById(id) {
      const user = await this.model.findById(id,{ username: 1, avatar_url: 1, status: 1, post_topics: 1})
      .populate([
        { path: 'collect_topics', select: { title: 1, view_count: 1, comment_count: 1, like_count: 1, owner: 1, tab: 1, updatedAt: 1, createdAt: 1 },
        populate: [
          { path: 'owner', select: 'username  avatar_url' },
        ],
        sort: { createdAt: -1 }},
      ]);
      
      const query = {};
      query.owner_id = this.ctx.user_id;

      const topics = await this.ctx.service.topic.getByUserId(query);
      user.post_topics = topics.docs;
      return user;
    }

  }
  return Service;
};

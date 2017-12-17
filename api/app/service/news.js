'use strict';
module.exports = app => {
  class Service extends app.BaseService {
    get model() {
      return this.ctx.model.News;
    }
    async getAll(query = {}) {
      query.status =
        query.status === undefined || query.status === '' ? true : query.status;
      let { limit = 10, page = 1 } = query;
      page = Number.parseInt(page);
      limit = Number.parseInt(limit);
      delete query.page;
      delete query.limit;
      const models = await this.model.paginate(query, {
        select: { title: 1, view_count: 1, comment_count: 1, like_count: 1, tab: 1, updatedAt: 1, createdAt: 1 },
        sort: { createdAt: -1 },
        page,
        limit,
      });
      return models;
    }

    async getById(id) {
      await this.updateById(id, { $inc: { view_count: 1 } });
      const news = await this.model.findById(id).populate();
      const news_id = news._id;
      const comments = await this.ctx.model.Comment.find({ news_id }, { news_id: 0 }).populate([
        { path: 'owner', select: 'username  avatar_url' },
      ]);
      news.comment = comments;
      return news;
    }

  }
  return Service;
};
 
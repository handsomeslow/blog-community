'use strict';
module.exports = app => {
  class Service extends app.BaseService {
    get model() {
      return this.ctx.model.Comment;
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
        select: { content: 1, likes: 1, owner: 1, updatedAt: 1, createdAt: 1 },
        populate: [
          { path: 'owner', select: 'username  avatar_url' },
        ],
        sort: { createdAt: -1 },
        page,
        limit,
      });
      return models;
    }

    async create(body) {
      const model = await this.model.create(body);
      const topic = await this.ctx.service.topic.updateById(model.topic_id, {
        $inc: { comment_count: 1 },
      });
      return model;
    }
    async deleteById(id) {
      const model = await this.model.findByIdAndRemove(id);
      const topic = await this.ctx.service.topic.updateById(model.topic_id, {
        $inc: { comment_count: -1 },
      });
      return model;
    }
    async upById(id) {
      await this.updateById(id, { $inc: { likes: 1 } });
      return true
    }
  }
  return Service;
};

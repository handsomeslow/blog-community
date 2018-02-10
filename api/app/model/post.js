'use strict';
const mongoosePaginate = require('mongoose-paginate');

module.exports = app => {
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const Schema = new mongoose.Schema(
    {
      owner: { type: ObjectId, ref: 'user' },
      owner_id:{type: String },
      couple:{type: ObjectId, ref: 'couple'},
      tab: { type: String },
      content: { type: String },
      like_count: { type: Number, default: 0 },
      likes: [{ type: ObjectId, ref: 'user' }],
      comment_count: { type: Number, default: 0 },
      comments: [{ type: ObjectId, ref: 'comment' }],
      status: { type: Boolean, default: true },
      images:[{ type: String }]
    },
    { timestamps: true }
  );
  Schema.plugin(mongoosePaginate);
  return mongoose.model('post', Schema);
};

'use strict';
const mongoosePaginate = require('mongoose-paginate');

module.exports = app => {
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const Schema = new mongoose.Schema(
    {
      phone: { type: String },
      motto: { type: String },
      username: { type: String, unique: true },
      password: { type: String },
      avatar_url: { type: String, default:'https://dn-ynhurit3.qbox.me/d6b15b52f814f3031e61.jpg' },
      status: { type: Boolean, default: true },
      collect_topics:[{type: ObjectId, ref: 'topic'}],
      post_topics:[{type: ObjectId, ref: 'topic' }]
    },
    { timestamps: true }
  );
  Schema.plugin(mongoosePaginate);
  return mongoose.model('user', Schema);
};

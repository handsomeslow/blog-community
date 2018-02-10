'use strict';
const mongoosePaginate = require('mongoose-paginate');

module.exports = app => {
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const Schema = new mongoose.Schema(
    {
      owner: { type: ObjectId, ref: 'user' },
      owner_id:{ type: String },
      tab: { type: String },
      title: { type: String },
      desc: { type: String },
      like_count: { type: Number, default: 0 },
      status: { type: Boolean, default: true },
      avatar: { type: String },
      members: [{ type: ObjectId, ref: 'user' }]
    },
    { timestamps: true }
  );
  Schema.plugin(mongoosePaginate);
  return mongoose.model('couple', Schema);
};

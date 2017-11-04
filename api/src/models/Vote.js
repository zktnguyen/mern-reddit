import mongoose from 'mongoose';

const { Schema } = mongoose;

// Only for either a post, or a comment. Post or comment required.
const voteSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: 'User' },
  postId: { type: Schema.ObjectId, ref: 'Post' },
  commentId: { type: Schema.ObjectId, ref: 'Comment' },
  count: Number
});

const Vote = mongoose.model('Vote', voteSchema);
export default Vote;
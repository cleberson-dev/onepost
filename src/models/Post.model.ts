import { Document, Schema, model } from 'mongoose';
import PostInterface from '../interfaces/Post.interface';

const PostSchema = new Schema({
  postId: Schema.Types.ObjectId,
  content: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  pubDate: {
    type: Date,
    default: Date.now
  },
  likes: [String]
});

export interface PostModel extends PostInterface, Document { };
export default model<PostModel>('Post', PostSchema);

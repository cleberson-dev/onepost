import { Schema } from 'mongoose';

export default interface PostInterface {
  postId: Schema.Types.ObjectId,
  content: string,
  publisher: string,
  pubDate: Date,
  likes: string[]
};

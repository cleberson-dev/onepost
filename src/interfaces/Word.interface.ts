import { Schema } from 'mongoose';

export default interface WordInterface {
  word: string,
  posts: [Schema.Types.ObjectId]
};

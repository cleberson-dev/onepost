import { Document, Schema, model } from 'mongoose';
import WordInterface from '../interfaces/Word.interface';

const WordSchema = new Schema({
  word: {
    type: String,
    required: true,
    unique: true
  },
  posts: [Schema.Types.ObjectId]
});

export interface WordModel extends WordInterface, Document { };
export default model<WordModel>('Word', WordSchema);

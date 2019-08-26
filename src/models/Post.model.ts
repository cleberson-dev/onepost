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

// Validação onde evita tais caracteres: <, >, ", / e \
PostSchema.path('content').validate(
  (value: string): boolean => !/[\u003C\u003E\u0022\u002F\u005C]/.test(value),
  'Caracteres inválidos para publicação.'
);

export interface PostModel extends PostInterface, Document { };
export default model<PostModel>('Post', PostSchema);

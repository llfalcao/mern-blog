import mongoose, { ObjectId } from 'mongoose';
const Schema = mongoose.Schema;

export interface Comment {
  author: string;
  text: string;
  post: ObjectId;
  created_at: Date;
  updated_at?: Date;
}

const CommentSchema = new Schema<Comment>({
  author: { type: String, required: true },
  text: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  created_at: { type: Date, required: true },
  updated_at: { type: Date },
});

const CommentModel = mongoose.model<Comment>('Comment', CommentSchema);
export default CommentModel;

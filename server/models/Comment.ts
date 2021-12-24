import mongoose, { ObjectId } from 'mongoose';
const Schema = mongoose.Schema;

interface Comment {
  text: string;
  author: ObjectId;
  created_at: Date;
  updated_at: Date;
}

const CommentSchema = new Schema<Comment>({
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, required: true },
  updated_at: { type: Date },
});

export default mongoose.model<Comment>('Comment', CommentSchema);

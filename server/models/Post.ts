import mongoose, { ObjectId } from 'mongoose';
const Schema = mongoose.Schema;

export interface Post {
  title: string;
  text: string;
  author: ObjectId;
  comments: ObjectId[];
  created_at: Date;
  updated_at?: Date;
  private: boolean;
}

const PostSchema = new Schema<Post>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  created_at: { type: Date, required: true },
  updated_at: { type: Date },
  private: { type: Boolean, required: true },
});

const PostModel = mongoose.model<Post>('Post', PostSchema);
export default PostModel;

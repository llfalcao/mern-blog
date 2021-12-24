import mongoose, { ObjectId } from 'mongoose';
const Schema = mongoose.Schema;

interface Post {
  title: string;
  text: string;
  author: ObjectId;
  created: Date;
  updated: Date;
  private: boolean;
}

const PostSchema = new Schema<Post>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, required: true },
  updated: { type: Date },
  private: { type: Boolean, required: true },
});

export default mongoose.model<Post>('Post', PostSchema);

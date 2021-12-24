import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface User {
  username: string;
  password: string;
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<User>('User', UserSchema);

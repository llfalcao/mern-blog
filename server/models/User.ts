import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface User {
  username: string;
  password: string;
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<User>('User', UserSchema);
export default UserModel;

import bcrypt from 'bcrypt';
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

UserSchema.pre('save', async function (next) {
  const user: User = this;
  const hash: string = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password: string) {
  const user: User = this;
  const isValid = await bcrypt.compare(password, user.password);
  return isValid;
};

const UserModel = mongoose.model<User>('User', UserSchema);
export default UserModel;

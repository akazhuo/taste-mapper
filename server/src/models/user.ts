import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IUser extends Document<ObjectId> {
  nickName: string;
  openid: string;
  avatar: string;
  refreshToken: string;
}

const UserSchema: Schema = new Schema({
  nickName: { type: String, required: true },
  openid: { type: String, required: true },
  avatar: { type: String },
  refreshToken: { type: String },
})

export default mongoose.model<IUser>('User', UserSchema);
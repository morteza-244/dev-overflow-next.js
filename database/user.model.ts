import { Document, model, models, Schema, Model } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
  joinedAt: Date;
  saved: Schema.Types.ObjectId[];
  password?: string;
  bio?: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  password: { type: String },
  bio: { type: String },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
});

const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);
export default User;

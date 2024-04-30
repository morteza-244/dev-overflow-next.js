import { Document, Model, model, models, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IAnswer extends Document {
  author: IUser;
  question: Schema.Types.ObjectId;
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  content: string;
  createdAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  upVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Answer: Model<IAnswer> = models.Answer || model<IAnswer>("Answer", AnswerSchema);
export default Answer;
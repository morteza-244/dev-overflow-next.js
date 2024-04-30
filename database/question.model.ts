import { Document, Model, model, models, Schema } from "mongoose";
import { ITag } from "./tag.model";
import { IUser } from "./user.model";

export interface IQuestion extends Document {
  title: string;
  content: string;
  tags: ITag[];
  views: number;
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  author: IUser;
  answers: Schema.Types.ObjectId[];
  createdAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  views: { type: Number, default: 0 },
  upVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answers" }],
  createdAt: { type: Date, default: Date.now },
});

const Question: Model<IQuestion> =
  models.Question || model<IQuestion>("Question", QuestionSchema);
export default Question;

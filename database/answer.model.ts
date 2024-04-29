import { Document, model, Schema } from "mongoose";

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  content: string;
  createdAt: Date;
}

const AnswerSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  upVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Answer = model("Answer", AnswerSchema);
export default Answer;

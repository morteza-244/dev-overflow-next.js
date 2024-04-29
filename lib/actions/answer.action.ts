"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";

export async function createAnswer(params: CreateAnswerParams) {
  const { author, content, path, question } = params;
  try {
    connectToDatabase();
    const answer = await Answer.create({
      author,
      content,
      question,
    });

    //Add the answer to the question's answer array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getAnswers(params: GetAnswersParams) {
  const { questionId } = params;
  try {
    connectToDatabase();
    const answers = await Answer.find({
      question: questionId,
    })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      })
      .sort({ createdAt: -1 });
    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

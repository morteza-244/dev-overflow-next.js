"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import { revalidatePath } from "next/cache";

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

    revalidatePath(path)
  } catch (error) {
    console.log(error);
  }
}

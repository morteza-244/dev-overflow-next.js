"use server";

import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";

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
  const { questionId, sortBy } = params;
  try {
    connectToDatabase();

    let sortedOptions = {};
    switch (sortBy) {
      case "highestUpVotes":
        sortedOptions = { upVotes: -1 };
        break;
      case "lowestUpVotes":
        sortedOptions = { upVotes: 1 };
        break;
      case "recent":
        sortedOptions = { createdAt: -1 };
        break;
      case "old":
        sortedOptions = { createdAt: 1 };
        break;
      default:
        break;
    }
    const answers = await Answer.find({
      question: questionId,
    })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      })
      .sort(sortedOptions);
    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upVoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { hasDownVoted, hasUpVoted, path, answerId, userId } = params;

    let updateQuery = {};

    if (hasUpVoted) {
      updateQuery = { $pull: { upVotes: userId } };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downVotes: userId },
        $push: { upVotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upVotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function downVoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { hasDownVoted, hasUpVoted, path, answerId, userId } = params;

    let updateQuery = {};

    if (hasDownVoted) {
      updateQuery = { $pull: { downVotes: userId } };
    } else if (hasUpVoted) {
      updateQuery = {
        $pull: { upVotes: userId },
        $push: { downVotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downVotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    connectToDatabase();
    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");

    await answer.deleteOne({ _id: answerId });
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } }
    );
    await Interaction.deleteMany({ answer: answerId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

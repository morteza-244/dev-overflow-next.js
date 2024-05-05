"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  SaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";

export async function getUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();
    const {searchQuery} = params;
    const query: FilterQuery<typeof User> = {}
    if(searchQuery){
      query.$or = [
        {name: {$regex: new RegExp(searchQuery, "i")}},
        {username: {$regex: new RegExp(searchQuery, "i")}},
      ]
    }
    const users = await User.find(query);
    return { users };
  } catch (error) {
    console.log(error);
    throw new Error("There is no users");
  }
}

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDatabase();
    const user = await User.findOne({
      clerkId: params.userId,
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(" User not found: " + params.userId);
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("User not created");
  }
}

export async function updatedUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, path, updateData } = params;
    await User.findOneAndUpdate({ clerkId: clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("User not updated");
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();
    const user = await User.findOneAndDelete({ clerkId: params.clerkId });
    if (!user) {
      throw new Error("User not found");
    }
    //Delete user from database
    // and questions, comments, etc.

    //get user question ids
    const userQuestionIds = await Question.find({
      author: user._id,
    }).distinct("_id");

    //delete user questions
    await Question.deleteMany({ author: user._id });

    //delete user answers

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw new Error("User not deleted");
  }
}

export async function saveQuestion(params: SaveQuestionParams) {
  try {
    const { path, questionId, userId } = params;
    connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const isSavedQuestion = user.saved.includes(questionId);

    if (isSavedQuestion) {
      //remove question from saved
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId },
        },
        { new: true }
      );
    } else {
      // add question to saved
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { saved: questionId },
        },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    const { clerkId } = params;
    connectToDatabase();
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!user) throw new Error("User not found");

    const savedQuestions = user.saved;

    return { savedQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({
      clerkId: userId,
    });
    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });
    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    console.log(error);
    throw new Error(" User not found: " + params.userId);
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const totalQuestions = await Question.countDocuments({ author: userId });
    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upVotes: -1 })
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return { totalQuestions, userQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const totalAnswers = await Answer.countDocuments({ author: userId });
    const userAnswers = await Answer.find({ author: userId })
      .sort({ upVotes: -1 })
      .populate({
        path: "question",
        model: Question,
        select: "_id title",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return { totalAnswers, userAnswers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

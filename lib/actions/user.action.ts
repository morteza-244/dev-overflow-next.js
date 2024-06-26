"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { TBadgeCriteria } from "@/types";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { assignBadges } from "../utils";
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
    const { searchQuery, filter, page = 1, pageSize = 4 } = params;
    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof User> = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    let sortedOptions = {};
    switch (filter) {
      case "new_users":
        sortedOptions = { joinedAt: -1 };
        break;
      case "old_users":
        sortedOptions = { joinedAt: 1 };
        break;
      case "top_contributors":
        query.answers = { reputation: -1 };
        break;
      default:
        break;
    }
    const users = await User.find(query)
      .sort(sortedOptions)
      .skip(skipAmount)
      .limit(pageSize);
    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / pageSize);
    const hasMore = totalUsers > skipAmount + users.length;
    return { users, totalPages, hasMore };
  } catch (error) {
    console.log(error);
    throw error;
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
    connectToDatabase();
    const { clerkId, searchQuery, filter } = params;
    const query: FilterQuery<typeof Question> = {};

    let sortedOptions = {};
    switch (filter) {
      case "most_recent":
        sortedOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortedOptions = { createdAt: 1 };
        break;
      case "most_voted":
        sortedOptions = { upVotes: -1 };
        break;
      case "most_viewed":
        sortedOptions = { views: -1 };
        break;
      case "most_answered":
        sortedOptions = { answers: -1 };
        break;
      default:
        break;
    }
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortedOptions,
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

    const [questionUpVotes] = await Question.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0,
          upVotes: { $size: "$upVotes" },
        },
      },
      {
        $group: {
          _id: null,
          totalUpVotes: { $sum: "$upVotes" },
        },
      },
    ]);

    const [answerUpVotes] = await Answer.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0,
          upVotes: { $size: "$upVotes" },
        },
      },
      {
        $group: {
          _id: null,
          totalUpVotes: { $sum: "$upVotes" },
        },
      },
    ]);

    const [questionViews] = await Answer.aggregate([
      { $match: { author: user._id } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
        },
      },
    ]);

    const criteria: { type: TBadgeCriteria; count: number }[] = [
      { type: "QUESTION_COUNT", count: totalQuestions },
      { type: "ANSWER_COUNT", count: totalAnswers },
      {
        type: "QUESTION_UP_VOTES",
        count: questionUpVotes?.totalUpVotes || 0,
      },
      {
        type: "ANSWER_UP_VOTES",
        count: answerUpVotes?.totalUpVotes || 0,
      },
      {
        type: "TOTAL_VIEWS",
        count: questionViews?.totalViews || 0,
      },
    ];

    const badgeCounts = assignBadges({ criteria });

    return { user, totalQuestions, totalAnswers, badgeCounts };
  } catch (error) {
    console.log(error);
    throw new Error(" User not found: " + params.userId);
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 4 } = params;
    const skipAmount = (page - 1) * pageSize;
    const totalQuestions = await Question.countDocuments({ author: userId });
    const userQuestions = await Question.find({ author: userId })
      .sort({ createdAt: -1, views: -1, upVotes: -1 })
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      })
      .skip(skipAmount)
      .limit(pageSize);
    const totalPages = Math.ceil(totalQuestions / pageSize);
    const hasMore = totalQuestions > skipAmount + userQuestions.length;
    return { totalQuestions, userQuestions, totalPages, hasMore };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 4 } = params;
    const totalAnswers = await Answer.countDocuments({ author: userId });
    const skipAmount = (page - 1) * pageSize;
    const userAnswers = await Answer.find({ author: userId })
      .sort({ upVotes: -1 })
      .skip(skipAmount)
      .limit(pageSize)
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
    const totalPages = Math.ceil(totalAnswers / pageSize);
    const hasMore = totalAnswers > skipAmount + userAnswers.length;
    return { totalAnswers, userAnswers, totalPages, hasMore };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

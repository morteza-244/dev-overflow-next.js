"use server";

import Question from "@/database/question.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";

export async function getUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();
    const users = await User.find({});
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
    await User.findOneAndUpdate(
      { clerkId: params.clerkId },
      params.updateData,
      { new: true }
    );
    revalidatePath(params.path);
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

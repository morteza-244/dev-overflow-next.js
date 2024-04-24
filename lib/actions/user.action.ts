"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetUserByIdParams } from "./shared.types";

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

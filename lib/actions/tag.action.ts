"use server";

import Question from "@/database/question.model";
import Tag, { ITag } from "@/database/tag.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams } from "./shared.types";

export async function getTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 4 } = params;
    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }
    let sortedOptions = {};
    switch (filter) {
      case "popular":
        sortedOptions = { questions: -1 };
        break;
      case "recent":
        sortedOptions = { createdAt: -1 };
        break;
      case "name":
        sortedOptions = { name: 1 };
        break;
      case "old":
        sortedOptions = { createdAt: 1 };
        break;
      default:
        break;
    }
    const tags = await Tag.find(query)
      .sort(sortedOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalTags = await Tag.countDocuments(query);
    const totalPages = Math.ceil(totalTags / pageSize);
    const hasMore = totalTags > skipAmount + tags.length;
    return { tags, totalPages, hasMore };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, searchQuery, page = 1, pageSize = 1 } = params;
    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    const skipAmount = (page - 1) * pageSize;
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.questions;
    const totalPages = Math.ceil(tag.questions.length / pageSize);
    const hasMore = tag.questions.length > pageSize;

    return {
      tagTitle: tag.name,
      questions,
      hasMore,
      totalPages,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPopularTags() {
  try {
    connectToDatabase();
    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 6 },
    ]);
    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

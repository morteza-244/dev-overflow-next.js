import { Schema } from "mongoose";

export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface Tag {
  _id: string;
  name: string;
  questions: TQuestion[];
}

export interface Filters {
  name: string;
  value: string;
}

export type TQuestion = {
  _id: string;
  title: string;
  tags: Tag[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upVotes: number[];
  answers: number[];
  createdAt: Date;
  views: number;
};

export type TAnswer = {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  createdAt: Date;
  content: string;
};

export type TUrlParams = {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}
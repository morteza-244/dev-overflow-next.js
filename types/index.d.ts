export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface Tag {
  _id: string;
  name: string;
}

export interface Filters {
  name: string;
  value: string;
}

export interface Question {
  _id: number;
  title: string;
  tags: { _id: number; name: string; totalQuestions: number }[];
  author: {
    _id: string;
    name: string;
    picture?: string;
  };
  upVotes: number;
  views: number;
  answers: number;
  createdAt: Date;
}

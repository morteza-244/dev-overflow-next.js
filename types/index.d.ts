export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface Tag {
  _id: number;
  name: string;
  totalQuestions: number;
}

export interface Filters {
  name: string;
  value: string;
}

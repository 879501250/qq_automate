export interface Diary {
  id: string;
  text: string;
  photos: string[];
  createTime: number;
  mood: string;
  score: string;
  ipLocation: string;
  user: User;
  album: Album;
  isSUser: boolean;
}

export type User = {
  id: string;
  age: string;
  gender: string;
  nickname: string;
  ipLocation: string;
  avatar: string;
};

export type Album = {
  id: string;
  title: string;
  photo: string;
  diaryNum: number;
  followNum: number;
  createTime: number;
};

export type QueryParams = {
  realQueryMoods: string[];
  shadowQueryMoods: string[];
  ipLocations: string[];
  contents: string[];
}

export type Mood = {
  id: string;
  name: string;
  realEnable: number;
  shadowEnable: number;
}






export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export interface Params {
  count: number;
}
export interface ListItemDataType {
  id: string;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}

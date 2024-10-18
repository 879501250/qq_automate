export interface Diary {
  id: string;
  text: string;
  photos: any[] | string[];
  createTime: number;
  mood: string | any;
  score: string;
  ipLocation: string;
  user: User;
  album: Album;
  isSUser: boolean;
  likedNum?: number;
  commentedNum?: number;
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
  title?: string;
  photo?: string;
  diaryNum?: number;
  followNum?: number;
  createTime?: number;
};


export type Mood = {
  id: string;
  name: string;
  realEnable: number;
  shadowEnable: number;
}

type SUser = {
  uid: string;
  albumIds?: string;
  diaryText?: string;
  photos?: string;
  lastActiveTime?: string;
};




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

export type User = {
  _id: string;
  userName: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  watchHistory: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Video = {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Owner = {
  _id: string;
  fullName: string;
  avatar: string;
};

export type VideoWithOwner = {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  owner: Owner;
  createdAt: Date;
  updatedAt: Date;
};

export type VideoWithOwnerWithCurrentUserData = {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  owner: Owner;
  createdAt: Date;
  updatedAt: Date;
  likesCount: number;
  subscribersCount: number;
  isSubscribed: boolean;
  isLiked: boolean;
};

export type Like = {
  _id: string;
  video?: string;
  comment?: string;
  tweet?: string;
  likedBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Subscription = {
  _id: string;
  subscription: string;
  channel: string;
  createdAt: Date;
  updatedAt: Date;
};

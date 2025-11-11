import { Owner, User, Video, VideoWithOwner } from './dbModelType';

export type ApiResponseFront<T = any> = {
  status: number;
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
  stack?: string;
};

export type LoginApiResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type GetAllVideosApiResponse = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  videos: VideoWithOwner[];
};

export type GetViewWatchHistoryApiResponse = {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  owner: Owner & { userName: string };
  createdAt: Date;
  updatedAt: Date;
};
export type GetUserProfileDetailsApiResponse = {
  _id: string;
  userName: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  uploadedVideos: Video[];
  subscribersCount: number;
  totalLikes: number;
  channelsSubscribedToCount: number;
  isSubscribed: true;
};

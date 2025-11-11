import { uploadVideo } from '@redux/action/videoAction';
import {
  GetAllVideosApiParam,
  GetVideoByIdApiParam,
  LikeToggleApiParam,
  SubscriptionToggleApiParam,
} from '../type/apiParamType';

export const WebServices = {
  //UAT ENV
  baseUrl: 'https://sharetube-063s.onrender.com/',
  //UAT ENV
  // baseUrl: 'https://ignite-uat.4cpl.com/',
  //VS ENV
  // baseUrl: 'https://192.168.1.29:400/',
  //Local ENV
  // baseUrl: 'http://192.168.137.1:3000',
  //PB Local
  // baseUrl: 'http://192.168.1.26:8000/',
  //PM local
  // baseUrl: 'http://192.168.1.56:3000/',

  login: '/api/v1/users/login',

  logout: '/api/v1/users/logout',

  refreshToken: '/api/v1/users/refresh-token',

  viewWatchHistory: '/api/v1/users/history',

  getAllVideos: ({ page, limit, query }: GetAllVideosApiParam) =>
    `/api/v1/video?page=${page}&limit=${limit}&query=${query ? query : ''}`,

  getVideoById: ({ videoId }: GetVideoByIdApiParam) =>
    `/api/v1/video/${videoId}`,

  addToWatchHistory: ({ videoId }: { videoId: string }) =>
    `/api/v1/video/addToWatchHistory/${videoId}`,

  toggleLike: ({ videoId, commentId, tweetId }: LikeToggleApiParam) =>
    `/api/v1/likes/toggle/${
      videoId ? `v/${videoId}` : commentId ? `c/${commentId}` : `t/${tweetId}`
    }`,

  subscriptionToggle: ({ channelId }: SubscriptionToggleApiParam) =>
    `/api/v1/subscriptions/c/${channelId}`,

  getAllLikedVideo: '/api/v1/likes/videos',

  uploadVideo: '/api/v1/video',
};

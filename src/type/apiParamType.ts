export type InitializeAppApiParam = {
  id: number;
};

export type GetAllVideosApiParam = {
  page: number;
  limit: number;
  query?: string;
};

export type GetVideoByIdApiParam = {
  videoId: string;
};

export type LikeToggleApiParam =
  | { commentId: string; tweetId?: never; videoId?: never }
  | { tweetId: string; commentId?: never; videoId?: never }
  | { videoId: string; commentId?: never; tweetId?: never };

export type SubscriptionToggleApiParam = {
  channelId: string;
};

export type GetUserProfileDetailsApiParam = {
  userName: string;
};

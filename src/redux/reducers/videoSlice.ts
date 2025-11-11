import {
  getAllVideosAction,
  getAllVideosFilteredAction,
  getVideoByIdAction,
  viewWatchHistory,
} from '@redux/action/videoAction';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetViewWatchHistoryApiResponse } from '@type/apiResponseType';
import {
  VideoWithOwner,
  VideoWithOwnerWithCurrentUserData,
} from '@type/dbModelType';

type VideoSliceState = {
  isLoading: boolean;
  allVideos: VideoWithOwner[] | undefined;
  totalRecord: number | undefined;
  page: number | undefined;
  limit: number | undefined;
  totalPages: number | undefined;
  selectedVideo: VideoWithOwnerWithCurrentUserData | undefined;
  watchHistory: GetViewWatchHistoryApiResponse[];
  allVideosFiltered: VideoWithOwner[] | undefined;
  totalRecordFiltered: number | undefined;
  pageFiltered: number | undefined;
  limitFiltered: number | undefined;
  totalPagesFiltered: number | undefined;
};

type VideoSliceStateKeys = keyof VideoSliceState | 'All';

const initialState: VideoSliceState = {
  isLoading: false,
  allVideos: undefined,
  totalRecord: undefined,
  page: undefined,
  limit: undefined,
  totalPages: undefined,
  selectedVideo: undefined,
  watchHistory: [],
  allVideosFiltered: [],
  totalRecordFiltered: undefined,
  pageFiltered: undefined,
  limitFiltered: undefined,
  totalPagesFiltered: undefined,
};

export const VideoSlice = createSlice({
  name: 'VideoSlice',
  initialState,
  reducers: {
    clearVideoState: (state, action: PayloadAction<VideoSliceStateKeys>) => {
      const { payload } = action;
      switch (payload) {
        case 'isLoading':
          state.isLoading = false;
          break;
        case 'allVideos':
          state.allVideos = [];
          state.limit = undefined;
          state.page = undefined;
          state.totalPages = undefined;
          state.totalRecord = undefined;
          break;
        case 'selectedVideo':
          state.selectedVideo = undefined;
          break;
        case 'allVideosFiltered':
          state.allVideosFiltered = [];
          state.limitFiltered = undefined;
          state.pageFiltered = undefined;
          state.totalPagesFiltered = undefined;
          state.totalRecordFiltered = undefined;
          break;
        default: {
          state.isLoading = false;
          state.allVideos = [];
          state.limit = undefined;
          state.page = undefined;
          state.totalPages = undefined;
          state.totalRecord = undefined;
          state.selectedVideo = undefined;
          state.allVideosFiltered = [];
          state.limitFiltered = undefined;
          state.pageFiltered = undefined;
          state.totalPagesFiltered = undefined;
          state.totalRecordFiltered = undefined;
        }
      }
    },
  },
  extraReducers(builder) {
    // Get all video
    builder.addCase(getAllVideosAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allVideos = action.payload.data?.videos ?? [];
      state.totalRecord = action.payload.data?.total;
      state.page = action.payload.data?.page;
      state.limit = action.payload.data?.limit;
      state.totalPages = action.payload.data?.totalPages;
    });
    builder.addCase(getAllVideosAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllVideosAction.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Get all video Filtered
    builder.addCase(getAllVideosFilteredAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allVideosFiltered = action.payload.data?.videos ?? [];
      state.totalRecordFiltered = action.payload.data?.total;
      state.pageFiltered = action.payload.data?.page;
      state.limitFiltered = action.payload.data?.limit;
      state.totalPagesFiltered = action.payload.data?.totalPages;
    });
    builder.addCase(getAllVideosFilteredAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllVideosFilteredAction.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Get Video By Id
    builder.addCase(getVideoByIdAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedVideo = action.payload.data;
    });
    builder.addCase(getVideoByIdAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getVideoByIdAction.rejected, (state, action) => {
      state.isLoading = false;
    });

    // View Watch History
    builder.addCase(viewWatchHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.watchHistory = action.payload.data?.reverse() ?? [];
    });
    builder.addCase(viewWatchHistory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(viewWatchHistory.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { clearVideoState } = VideoSlice.actions;
export default VideoSlice.reducer;

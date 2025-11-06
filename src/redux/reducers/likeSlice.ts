import { getAllLikedVideo, likeToggleAction } from '@redux/action/likeAction';
import { createSlice } from '@reduxjs/toolkit';
import { Like, VideoWithOwnerWithCurrentUserData } from '@type/dbModelType';

type LikeSliceState = {
  isLoading: boolean;
  like: Like | undefined;
  likedVideos: VideoWithOwnerWithCurrentUserData[];
};

const initialState: LikeSliceState = {
  isLoading: false,
  like: undefined,
  likedVideos: [],
};

export const LikeSlice = createSlice({
  name: 'LikeSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Toggle Like Btn
    builder.addCase(likeToggleAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.like = action.payload.data;
    });
    builder.addCase(likeToggleAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(likeToggleAction.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Get All Liked Video
    builder.addCase(getAllLikedVideo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.likedVideos = action.payload.data?.reverse() ?? [];
    });
    builder.addCase(getAllLikedVideo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllLikedVideo.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {} = LikeSlice.actions;
export default LikeSlice.reducer;

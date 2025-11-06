import { likeToggleAction } from '@redux/action/likeAction';
import { createSlice } from '@reduxjs/toolkit';
import { Like } from '@type/dbModelType';

type LikeSliceState = {
  isLoading: boolean;
  like: Like | undefined;
};

const initialState: LikeSliceState = {
  isLoading: false,
  like: undefined,
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
  },
});

export const {} = LikeSlice.actions;
export default LikeSlice.reducer;

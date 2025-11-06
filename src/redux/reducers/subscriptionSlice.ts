import { subscriptionToggleAction } from '@redux/action/subscriptionAction';
import { createSlice } from '@reduxjs/toolkit';
import { Subscription } from '@type/dbModelType';

type subscriptionSliceState = {
  isLoading: boolean;
  subscription: Subscription | undefined;
};

const initialState: subscriptionSliceState = {
  isLoading: false,
  subscription: undefined,
};

export const subscriptionSlice = createSlice({
  name: 'subscriptionSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Toggle Subscribe Btn
    builder.addCase(subscriptionToggleAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.subscription = action.payload.data;
    });
    builder.addCase(subscriptionToggleAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(subscriptionToggleAction.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

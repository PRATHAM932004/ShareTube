import { getUserProfileDetails } from '@redux/action/userAction';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetUserProfileDetailsApiResponse } from '@type/apiResponseType';

type UserSliceState = {
  isLoading: boolean;
  userProfile?: GetUserProfileDetailsApiResponse;
};

type UserSliceStateKeys = keyof UserSliceState | 'All';

const initialState: UserSliceState = {
  isLoading: false,
  userProfile: undefined,
};

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    clearUserState: (state, action: PayloadAction<UserSliceStateKeys>) => {
      const { payload } = action;
      switch (payload) {
        case 'isLoading':
          state.isLoading = false;
          break;
        case 'userProfile':
          state.userProfile = undefined;
          break;
        default: {
          state.isLoading = false;
          state.userProfile = undefined;
        }
      }
    },
  },
  extraReducers(builder) {
    // Toggle Like Btn
    builder.addCase(getUserProfileDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userProfile = action.payload.data;
    });
    builder.addCase(getUserProfileDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserProfileDetails.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { clearUserState } = UserSlice.actions;
export default UserSlice.reducer;

import { loginRequest, logoutRequest } from '@redux/action/authAction';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@type/dbModelType';

type AuthSliceState = {
  isLoading: boolean;
  user: User | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
};

const initialState: AuthSliceState = {
  isLoading: false,
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
};

export const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    //Login
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data?.user;
      state.accessToken = action.payload.data?.accessToken;
      state.refreshToken = action.payload.data?.refreshToken;
    });
    builder.addCase(loginRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.isLoading = false;
    });

    //Logout
    builder.addCase(logoutRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = undefined;
      state.accessToken = undefined;
      state.refreshToken = undefined;
    });
    builder.addCase(logoutRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logoutRequest.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { setUser } = AuthSlice.actions;
export default AuthSlice.reducer;

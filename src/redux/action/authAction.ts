import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponseFront, LoginApiResponse } from '@type/apiResponseType';
import { ApiUtils, STATUS, WebServices } from '@utils';
import { LoginSchemaType } from '@zSchema';

export const loginRequest = createAsyncThunk<
  ApiResponseFront<LoginApiResponse>,
  { body: LoginSchemaType; navigation: any },
  {}
>('loginRequest', async ({ body, navigation }, thunkApi) => {
  try {
    const response = await ApiUtils({
      navigation,
      route: WebServices.login,
      body,
      isSecure: false,
    });
    const { status, data } = response;
    if (status === STATUS.SUCCESS) {
      return data;
    } else {
      console.log('API_BAD_STATUS', JSON.stringify(response));
      return response;
    }
  } catch (error) {
    console.log('API_BAD_REQUEST', JSON.stringify(error));
    return thunkApi.rejectWithValue(error);
  }
});

export const logoutRequest = createAsyncThunk<
  ApiResponseFront<{}>,
  { navigation: any },
  {}
>('logoutRequest', async ({ navigation }, thunkApi) => {
  try {
    const response = await ApiUtils({
      navigation,
      route: WebServices.logout,
      isSecure: false,
    });
    const { status, data } = response;
    if (status === STATUS.SUCCESS) {
      return data;
    } else {
      console.log('API_BAD_STATUS', JSON.stringify(response));
      return response;
    }
  } catch (error) {
    console.log('API_BAD_REQUEST', JSON.stringify(error));
    return thunkApi.rejectWithValue(error);
  }
});

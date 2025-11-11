import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetUserProfileDetailsApiParam } from '@type/apiParamType';
import {
  ApiResponseFront,
  GetUserProfileDetailsApiResponse,
} from '@type/apiResponseType';
import { ApiUtils, STATUS, WebServices } from '@utils';

export const getUserProfileDetails = createAsyncThunk<
  ApiResponseFront<GetUserProfileDetailsApiResponse>,
  { body: GetUserProfileDetailsApiParam; navigation: any },
  {}
>('getUserProfileDetails', async ({ body, navigation }, thunkApi) => {
  try {
    const response = await ApiUtils({
      navigation,
      route: WebServices.getUserProfile(body),
      body,
      isSecure: false,
      method: 'GET',
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

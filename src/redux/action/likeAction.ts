import { createAsyncThunk } from '@reduxjs/toolkit';
import { LikeToggleApiParam } from '@type/apiParamType';
import { ApiResponseFront } from '@type/apiResponseType';
import { Like } from '@type/dbModelType';
import { ApiUtils, STATUS, WebServices } from '@utils';

export const likeToggleAction = createAsyncThunk<
  ApiResponseFront<Like>,
  { body: LikeToggleApiParam; navigation: any },
  {}
>('likeToggleAction', async ({ body, navigation }, thunkApi) => {
  try {
    const response = await ApiUtils({
      navigation,
      route: WebServices.toggleLike(body),
      isSecure: false,
      method: 'POST',
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

import { createAsyncThunk } from '@reduxjs/toolkit';
import { SubscriptionToggleApiParam } from '@type/apiParamType';
import { ApiResponseFront } from '@type/apiResponseType';
import { Subscription } from '@type/dbModelType';
import { ApiUtils, STATUS, WebServices } from '@utils';

export const subscriptionToggleAction = createAsyncThunk<
  ApiResponseFront<Subscription>,
  { body: SubscriptionToggleApiParam; navigation: any },
  {}
>('subscriptionToggleAction', async ({ body, navigation }, thunkApi) => {
  try {
    const response = await ApiUtils({
      navigation,
      route: WebServices.subscriptionToggle(body),
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

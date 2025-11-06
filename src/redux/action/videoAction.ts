import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetAllVideosApiParam, GetVideoByIdApiParam } from '@type/apiParamType';
import {
  ApiResponseFront,
  GetAllVideosApiResponse,
  GetViewWatchHistoryApiResponse,
} from '@type/apiResponseType';
import { VideoWithOwnerWithCurrentUserData } from '@type/dbModelType';
import { ApiUtils, STATUS, WebServices } from '@utils';

export const getAllVideosAction = createAsyncThunk<
  ApiResponseFront<GetAllVideosApiResponse>,
  { body: GetAllVideosApiParam; navigation: any },
  {}
>('getAllVideosAction', async ({ body, navigation }, thunkApi) => {
  try {
    const response = await ApiUtils({
      navigation,
      route: WebServices.getAllVideos(body),
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

export const addToWatchHistory = createAsyncThunk<
  ApiResponseFront<GetAllVideosApiResponse>,
  { body: { videoId: string }; navigation: any },
  {}
>('addToWatchHistory', async ({ body, navigation }, thunkApi) => {
  try {
    const response = await ApiUtils({
      navigation,
      route: WebServices.addToWatchHistory(body),
      isSecure: false,
      method: 'PATCH',
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

export const getVideoByIdAction = createAsyncThunk<
  ApiResponseFront<VideoWithOwnerWithCurrentUserData>,
  { body: GetVideoByIdApiParam; navigation: any },
  {}
>('getVideoByIdAction', async ({ body, navigation }, thunkApi) => {
  try {
    const response = await ApiUtils({
      navigation,
      route: WebServices.getVideoById(body),
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

export const viewWatchHistory = createAsyncThunk<
  ApiResponseFront<GetViewWatchHistoryApiResponse[]>,
  { navigation: any },
  {}
>('viewWatchHistory', async ({ navigation }, thunkApi) => {
  try {
    const response = await ApiUtils({
      navigation,
      route: WebServices.viewWatchHistory,
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

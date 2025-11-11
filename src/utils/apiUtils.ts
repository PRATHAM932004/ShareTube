import { Strings } from '@theme';
import { APIHeader, ApiUtilsType, MethodType } from '@type/apiUtilsType';
import { ToastHideType } from '@type/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { STATUS } from './constant';
import { getToken, logout, showToast } from './functionUtils';
import NetInfo from '@react-native-community/netinfo';
import { WebServices } from './webServices';
import { clearAsyncValue, getAsyncValue, setAsyncValue } from './asyncStorage';

const API_REQUEST_TIMEOUT = 7000;

export const urlEncodedHeader = {
  Accept: '*/*',
  'Content-Type': 'application/x-www-form-urlencoded',
};

export const commonHeader = {
  Accept: '*/*',
  'Content-Type': 'application/json',
};

export const fileHeader = {
  Accept: '*/*',
  'Content-Type': 'multipart/form-data',
};

export const noContentTypeHeader = {
  Accept: '*/*',
};

let isRefreshing = false;

let refreshTokenPromise: Promise<string | void> | null = null;

const refreshToken = async (): Promise<string> => {
  const refreshToken = await getAsyncValue('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  console.log('refreshToken', refreshToken);
  const body = { refreshToken };

  const config: AxiosRequestConfig = {
    method: 'POST',
    baseURL: WebServices.baseUrl,
    url: WebServices.refreshToken,
    headers: commonHeader,
    data: body,
    timeout: API_REQUEST_TIMEOUT,
  };

  const response = await axios(config);

  if (response.status === 200) {
    const newAccessToken = response.data.data.accessToken;
    const newRefreshToken = response.data.data.refreshToken;

    await setAsyncValue('accessToken', newAccessToken);
    await setAsyncValue('refreshToken', newRefreshToken);
    return newAccessToken;
  } else {
    throw new Error('Failed to refresh token');
  }
};

const getHeader = (header: APIHeader) => {
  switch (header) {
    case 'Urlencoded':
    case 'Login':
      return urlEncodedHeader;
    case 'fileHeader':
      return fileHeader;
    case 'NoContentType':
      return noContentTypeHeader;
    default:
      return commonHeader;
  }
};

// Axios interceptors
axios.interceptors.request.use(
  (request) => {
    console.log('API_REQUEST', request);
    return request;
  },
  (error) => {
    console.error('API_CONFIG_ERROR', error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (!error.config.url?.includes(WebServices.refreshToken)) {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenPromise = refreshToken()
            .catch(async () => {
              showToast('Session expired. Please log in again.');
              await clearAsyncValue();
            })
            .finally(() => {
              isRefreshing = false;
            });
          const newToken = await refreshTokenPromise;
          originalRequest._retry = true;
          if (newToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return axios(originalRequest);
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export const ApiUtils = (param: ApiUtilsType): Promise<any> => {
  const method: MethodType = param.method || 'POST';
  const header: APIHeader = param.header || 'JSON';
  const isSecure = param.isSecure !== undefined ? param.isSecure : true;

  return new Promise((resolve, reject) => {
    NetInfo.fetch().then(async (state) => {
      if (state.isConnected) {
        const config: AxiosRequestConfig = {
          method,
          baseURL: WebServices.baseUrl,
          url: param.route,
          headers: getHeader(header),
          timeout: API_REQUEST_TIMEOUT,
        };

        if (isSecure && config.headers) {
          const token = await getToken();
          config.headers.Authorization = `Bearer ${
            header === 'Login' || header === 'Token' ? param.token : token
          }`;
        }

        if (param.body) config.data = param.body;

        axios(config)
          .then((response) => resolve(response))
          .catch((error) => {
            try {
              handleApiError(
                error,
                param.route,
                param.bedReqToastHideType,
                param.navigation
              );
            } catch (err) {
              reject(err);
            }
          });
      } else {
        showToast(Strings.noConnection, 'warningToast');
        reject(new Error('ERR_NETWORK'));
      }
    });
  });
};

const handleApiError = (
  error: any,
  route: string,
  bedReqToastHideType: ToastHideType = 'Default',
  navigation?: any
): never => {
  console.log('Handle_API_Error');
  const status = error?.response?.status;
  const data = error?.response?.data;
  const message = error?.response?.message;
  if (error.code === 'ERR_NETWORK') {
    showToast(Strings.noConnection, 'warningToast');
    throw error;
  } else if (
    status === STATUS.BAD_REQUEST ||
    status === STATUS.INTERNAL_SERVER_ERROR
  ) {
    const msg = message ?? Strings.commonErrorMsg;
    showToast(msg, 'errorToast', bedReqToastHideType);
    throw error.response;
  } else if (status === STATUS.UNAUTHORISE) {
    showToast(
      Strings.unauthoriseMessage(Strings.appName),
      'errorToast',
      'LongToast'
    );
    logout(navigation);
    throw error;
  } else {
    showToast(Strings.somethingWentWrong, 'errorToast', 'LongToast');
    throw error.response || error;
  }
};

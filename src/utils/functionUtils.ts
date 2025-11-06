import { IgToastType, ToastHideType } from '@type/common';
import { DEFAULT_VISIBILITY_TIME, LONG_VISIBILITY_TIME } from './constant';
import Toast from 'react-native-toast-message';
import { CommonActions } from '@react-navigation/native';
import { clearAsyncValue, getAsyncValue } from './asyncStorage';
import { User } from '@type/dbModelType';

export const showToast = (
  msg: string,
  type: IgToastType = 'errorToast',
  autoHide: ToastHideType = 'Default'
) => {
  if (msg) {
    Toast.show({
      type: type,
      topOffset: 0,
      autoHide: autoHide != 'NotHide',
      text1: msg,
      visibilityTime:
        autoHide == 'Default' ? DEFAULT_VISIBILITY_TIME : LONG_VISIBILITY_TIME,
      props: { autoHide: autoHide },
    });
  }
};

export const hideToast = () => {
  Toast.hide();
};

export const getToken = async () => {
  let token = await getAsyncValue('accessToken');
  return token;
};

export const logout = async (navigation: any, hold: number = 500) => {
  await clearAsyncValue();
  if (navigation) {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'LOGIN',
            },
          ],
        })
      );
    }, hold);
  }
};

export const getUser = async (): Promise<User | undefined> => {
  const user = await getAsyncValue('userData');
  if (user) {
    return JSON.parse(user);
  }
};

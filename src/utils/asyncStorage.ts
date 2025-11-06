import AsyncStorage from '@react-native-async-storage/async-storage';

export type ASKeyType =
  | 'accessToken'
  | 'refreshToken'
  | 'isLogin'
  | 'userData'
  | 'menus'
  | 'machine'
  | 'operator'
  | 'language'
  | 'shift';

export const setAsyncValue = async (key: ASKeyType, value: any) => {
  await AsyncStorage.setItem(key, value);
};

export const setMultiAsyncValue = async (keyValuePairs: [ASKeyType, any][]) => {
  await AsyncStorage.multiSet(keyValuePairs);
};

export const getAsyncValue = async (key: ASKeyType) => {
  return await AsyncStorage.getItem(key);
};

export const getMultiAsyncValue = async (keys: ASKeyType[]) => {
  await AsyncStorage.multiGet(keys);
};

export const clearAsyncValue = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Failed to clear storage:', error);
  }
};

export const removeAsyncItem = async (key: ASKeyType) => {
  await AsyncStorage.removeItem(key);
};

export const removeMultiAsyncItem = async (keys: ASKeyType[]) => {
  await AsyncStorage.multiRemove(keys);
};

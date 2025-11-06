import { ToastHideType } from './common';

export type ApiUtilsType = {
  navigation: any;
  route: string;
  method?: MethodType;
  body?: any;
  header?: APIHeader;
  isSecure?: boolean;
  bedReqToastHideType?: ToastHideType;
  token?: string;
};

export type MethodType = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

export type APIHeader =
  | 'JSON'
  | 'Urlencoded'
  | 'fileHeader'
  | 'Login'
  | 'Token';

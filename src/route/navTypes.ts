import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, Theme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SPLASH: undefined;
  LOGIN: undefined;
  DASHBOARD: undefined;
  PLAYVIDEO: { _id: string };
  PROFILE: undefined;
};

export type RootBottomParamList = {
  Home: undefined;
  Profile: undefined;
};

export type StackProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type BottomProps<T extends keyof RootBottomParamList> =
  NativeStackScreenProps<RootBottomParamList, T>;

export type ScreenOptionsProps = {
  route: RouteProp<RootBottomParamList, keyof RootBottomParamList>;
  navigation: BottomTabNavigationProp<RootBottomParamList>;
  theme: Theme;
};

export type ScreenOptionsTabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  RouteProp,
  Theme,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SPLASH: undefined;
  LOGIN: undefined;
  DASHBOARD: undefined;
  PLAYVIDEO: { _id: string };
};

export type RootBottomParamList = {
  HOME: undefined;
  PROFILE: undefined;
};

export type RootProfileParamList = {
  PROFILEMAIN: undefined;
  LIKEDVIDEO: undefined;
};

export type StackProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type BottomTabScreenProps<T extends keyof RootBottomParamList> =
  NativeStackScreenProps<RootBottomParamList, T>;

export type ProfileStackProps<T extends keyof RootProfileParamList> =
  NativeStackScreenProps<RootProfileParamList, T>;

// export type BottomProps<T extends keyof RootBottomParamList> =
//   CompositeScreenProps<
//     BottomTabScreenProps<RootBottomParamList, T>,
//     StackProps<keyof RootStackParamList>
//   >;

// type MoreProps<T extends keyof RootProfileParamList> = CompositeScreenProps<
//   ProfileStackProps<RootProfileParamList, T>,
//   BottomTabScreenProps<keyof RootBottomParamList>
// >;

export type MoreProps<T extends keyof RootProfileParamList> =
  CompositeScreenProps<
    ProfileStackProps<T>,
    BottomTabScreenProps<keyof RootBottomParamList>
  >;

export type BottomMainProps<T extends keyof RootBottomParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<T>,
    MoreProps<keyof RootProfileParamList>
  >;

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

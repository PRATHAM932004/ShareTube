import { IconProps } from 'react-native-vector-icons/Icon';

export type ToastHideType = 'Default' | 'LongToast' | 'NotHide';

export declare type IgToastType =
  | 'successToast'
  | 'errorToast'
  | 'warningToast';

export type STIconCategoryType =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome5Brands'
  | 'FontAwesome6'
  | 'FontAwesome6Brands'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';

export type STIconProps = IconProps & {
  type?: STIconCategoryType;
  onPress?: () => void;
};

export type ActionMenuId =
  | 'Logout'
  | 'More'
  | 'Oprator'
  | 'Machine'
  | 'Language'
  | 'Handover'
  | 'Shiftend';

export type ActionMenu = {
  id: ActionMenuId;
  name: string;
  icon: STIconProps;
  isPrimary?: boolean;
  isPrimaryWithLabel?: boolean;
  isNotPress?: boolean;
};

export type FormattedTime = {
  hours: string;
  minutes: string;
  seconds: string;
};

export type DocumentPickerResponse = {
  name: string;
  uri: string;
  type: string;
  nativeType?: string;
  size?: number;
  isVirtual?: boolean;
  hasRequestedType?: boolean;
  error?: string | null;
  convertibleToMimeTypes?: string[] | null;
};

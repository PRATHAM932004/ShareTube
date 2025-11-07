import { STIcon } from '@components';
import React from 'react';
import { ScreenOptionsProps, ScreenOptionsTabBarIconProps } from './navTypes';
import { icons } from '@utils';

interface TabBarIconType
  extends ScreenOptionsProps,
    ScreenOptionsTabBarIconProps {}

const TabBarIcon = ({ focused, color, size, route }: TabBarIconType) => {
  const getIcon = () => {
    switch (route.name) {
      case 'HOME':
        return icons.Home;
      case 'PROFILE':
        return icons.Profile;
      case 'UPLOAD':
        return icons.Upload;
      default: {
        return icons.Home;
      }
    }
  };
  return <STIcon size={size} {...getIcon()} color={color} />;
};

export default TabBarIcon;

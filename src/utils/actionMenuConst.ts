import { ActionMenu } from '@type/common';
import { icons } from './icons';

export const logoutAction: ActionMenu = {
  id: 'Logout',
  name: 'Logout',
  icon: icons.logout,
};

export const searchAction: ActionMenu = {
  id: 'Search',
  icon: icons.search,
  name: 'Search',
};

export const moreAction: ActionMenu = {
  id: 'More',
  name: 'More',
  icon: icons.moreAction,
  isPrimary: true,
};

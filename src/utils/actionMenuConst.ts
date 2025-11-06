import { ActionMenu } from '@type/common';
import { icons } from './icons';

export const logoutAction: ActionMenu = {
  id: 'Logout',
  name: 'Logout',
  icon: icons.logout,
};

export const operatorAction: ActionMenu = {
  id: 'Oprator',
  icon: icons.user,
  name: 'Oprator',
  isPrimaryWithLabel: true,
  isNotPress: true,
};

export const machineAction: ActionMenu = {
  id: 'Machine',
  icon: icons.settings,
  name: 'Machine',
  isPrimaryWithLabel: true,
  isNotPress: true,
};

export const languageAction: ActionMenu = {
  id: 'Language',
  name: 'Language',
  icon: icons.language,
};

export const moreAction: ActionMenu = {
  id: 'More',
  name: 'More',
  icon: icons.moreAction,
  isPrimary: true,
};

export const handOverAction: ActionMenu = {
  id: 'Handover',
  name: 'Handover',
  icon: icons.handOver,
  isPrimary: false,
};

export const shiftEndAction: ActionMenu = {
  id: 'Shiftend',
  name: 'Shift End',
  icon: icons.shiftEnd,
  isPrimary: false,
};

export const homeActiopnMenu = [languageAction, logoutAction];

import { Color } from '@theme';
import { STIconProps } from '@type/common';

const iconMap = {
  mobile: { name: 'call', type: 'MaterialIcons' },
  password: { name: 'lock', type: 'MaterialIcons', color: Color.white },
  eye: { name: 'eye', type: 'MaterialCommunityIcons', color: Color.white },
  eyeOff: {
    name: 'eye-off',
    type: 'MaterialCommunityIcons',
    color: Color.white,
  },
  back: { name: 'arrow-back', type: 'MaterialIcons' },
  logout: { name: 'logout', type: 'MaterialIcons' },
  user: { name: 'user', type: 'FontAwesome', color: Color.white },
  search: { name: 'search', type: 'MaterialIcons' },
  moreAction: { name: 'dots-three-vertical', type: 'Entypo' },
  settings: { name: 'settings', type: 'MaterialIcons' },
  info: { name: 'info-circle', type: 'FontAwesome' },
  setting: { name: 'cog', type: 'FontAwesome' },
  progressClock: { name: 'progress-clock', type: 'MaterialCommunityIcons' },
  language: { name: 'language', type: 'Ionicons' },
  close: { name: 'close', type: 'Ionicons' },
  planned: { name: 'done', type: 'MaterialIcons' },
  inProduction: { name: 'cog-outline', type: 'MaterialCommunityIcons' },
  partiallyProduced: {
    name: 'progress-check',
    type: 'MaterialCommunityIcons',
  },
  produced: {
    name: 'checkbox-marked-circle-outline',
    type: 'MaterialCommunityIcons',
  },
  handOver: {
    name: 'hand-coin',
    type: 'MaterialCommunityIcons',
  },
  rightArrowK: {
    name: 'keyboard-arrow-right',
    type: 'MaterialIcons',
  },
  shiftEnd: {
    name: 'user-clock',
    type: 'FontAwesome6',
  },
  startMCard: {
    name: 'triangle-right',
    type: 'Entypo',
  },
  Home: {
    name: 'home',
    type: 'MaterialIcons',
  },
  Profile: {
    name: 'person',
    type: 'MaterialIcons',
  },
  Upload: {
    name: 'plus',
    type: 'FontAwesome5',
  },
} satisfies Record<string, STIconProps>;

export const icons = iconMap;

export type IconsData = keyof typeof iconMap;

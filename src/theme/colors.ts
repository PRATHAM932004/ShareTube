export const Color = {
  backgroundPrimary: '#0F0F0F', // Main app background (page, video list, player background)
  backgroundSecondary: '#181818', // Section background (sidebar, nav bar, cards)
  backgroundTertiary: '#212121', // Elevated surfaces, hover states, dropdown menus

  accent: '#FF0000', // Primary brand red (play button, progress bar, active tabs)
  accentHover: '#E30000', // Accent color for hover or pressed states

  textPrimary: '#FFFFFF', // Main readable text (titles, headers)
  textSecondary: '#AAAAAA', // Subtext, view counts, timestamps, descriptions

  divider: '#303030', // Borders, list dividers, subtle separators
  iconInactive: '#909090', // Muted icons (inactive buttons, navigation icons)

  likeBlue: '#3EA6FF', // “Like” button active state (matches YouTube style)
  subscribeRed: '#CC0000', // “Subscribe” button active state (slightly warmer red)

  inputBackground: '#121212', // Search bar, comment input, form fields background
  overlayBackground: 'rgba(0, 0, 0, 0.8)', // Dark overlay for modals, dialogs, or video popups

  scrollbarTrack: '#1E1E1E', // Scrollbar track background
  scrollbarThumb: '#333333', // Scrollbar thumb (draggable part)

  font: '#006db0',
  black_222: '#222222',
  black_444: '#444444',
  currentCard: '#E0F2F1',
  white: '#FFFFFF',
  transparent_White: 'rgba(255, 255, 255, 0.1)',
  white_50: 'rgba(255, 255, 255, 0.50)',
  white_60: 'rgba(255, 255, 255, 0.75)',
  transperent: 'rgba(0, 0, 0, 0)',
  black_333: '#333333',
  black_666: '#666666',
  black_25: 'rgba(0, 0, 0, 0.25)',
  black_50: 'rgba(0, 0, 0, 0.50)',
  black_60: 'rgba(0, 0, 0, 0.6)',
  black: '#000000',
  gray_555: '#555555',
  red: '#db3434ff',

  inputBorder: '#9E9E9E',
  cardBorder: '#CCCCCC',
  inputError: '#B3261E',
  disableColor: '#757575',

  //Toast
  successToast: '#1f8722',
  bgSuccessToast: '#def1d7',
  errorToast: '#d9100a',
  bgErrorToast: '#fae1db',
  warnToast: '#f08135',
  bgWarnToast: '#fef7ec',

  //card
  cardBackground: '#adb5bd',
  dark_Gray: '#4c566a',
  white_Gray: '#eeeeee',
  silver_Gray: '#cccccc',
  gray_200: '#EEEEEE',

  light_Blue: '#EAF2FF',
  dark_Blue: '#1E90FF',
  light_Red: '#FFF1F1',
  dark_Red: '#A52A2A',
  light_Yellow: '#FFF4E1',
  dark_Yellow: '#D2691E',
  light_Lavender: '#F5EDFF',
  dark_Lavender: '#9370DB',
  light_Cyan: '#E9FBFF',
  dark_Cyan: '#00CED1',
  light_Beige: '#FFF9E7',
  dark_Beige: '#FFA500',
  light_Pink: '#FFEFF4',
  dark_Pink: '#C040C0',
  light_Mint_Green: '#EDFFF3',
  dark_Mint_Green: '#32CD32',

  //Status color
  planned: '#616161',
  plannedLite: '#e0e0e0',
  in_production: '#0d47a1',
  in_productionLite: '#bbdefb',
  partially_produced: '#e65100',
  partially_producedLite: '#ffe0b2',
  produced: '#256029',
  producedLite: '#c8e6c9',

  //Work Item
  color_1: '#476270',
  color_2: '#F57C00',
  color_3: '#039BE5',
  color_4: '#662266',
  color_5: '#388E3C',
  color_6: '#E53935',
  color_7: '#EE7849',
  color_8: '#6A1B9A',
  color_9: '#87222D',
  color_10: '#7CB342',
  color_11: '#2F4F4F',
  color_12: '#333333',
  color_13: '#3F51B5',
  color_14: '#007467',
  color_15: '#AD1457',
  color_16: '#52C7B8',
  color_17: '#003D00',
  color_18: '#AF5773',
  color_19: '#405882',
  color_20: '#CCB643',
  color_21: '#0F9671',
  color_22: '#AD119A',
  color_23: '#9022C1',
  color_24: '#A8A544',
  color_25: '#115B76',
  color_26: '#579705',
  color_27: '#755545',
  color_28: '#111E57',
  color_29: '#997E3B',
  color_30: '#61C6B0',
  color_31: '#AA422A',
  color_32: '#C34312',
  color_33: '#E631BD',
  color_34: '#970B40',
  color_35: '#C15359',
  color_36: '#510111',
  color_37: '#87222D',
  color_38: '#579705',
};

export type ColorKeyType = keyof typeof Color;

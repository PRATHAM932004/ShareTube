import { Color } from '@theme';
import { moderateScale } from '@utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  popupOverlay: {
    flex: 1,
    backgroundColor: Color.transperent,
    alignItems: 'flex-end',
    paddingTop: moderateScale(75),
    paddingEnd: moderateScale(16),
  },

  popupMenu: {
    backgroundColor: Color.white,
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    elevation: 5,
    width: 150,
  },

  menuOption: {
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(8),
  },

  menuText: {
    marginLeft: moderateScale(10),
    fontSize: moderateScale(14),
    color: Color.black,
  },
});

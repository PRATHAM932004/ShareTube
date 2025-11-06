import { Color } from '@theme';
import { moderateScale } from '@utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: Color.accent,
    height: moderateScale(50),
    justifyContent: 'center',
    borderRadius: moderateScale(8),
  },
});

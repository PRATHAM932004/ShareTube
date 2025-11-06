import { Color } from '@theme';
import { moderateScale } from '@utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundPrimary,
  },
  titleLogo: {
    textAlign: 'center',
    fontSize: moderateScale(100),
    fontWeight: 'bold',
    color: Color.white,
    textTransform: 'uppercase',
  },
});

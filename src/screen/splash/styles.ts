import { Color } from '@theme';
import { moderateScale } from '@utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLogo: {
    fontSize: moderateScale(100),
    color: Color.white,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

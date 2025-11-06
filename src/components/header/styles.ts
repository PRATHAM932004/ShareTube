import { Color } from '@theme';
import { moderateScale } from '@utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.backgroundPrimary,
    alignItems: 'center',
  },
  subContainer: {
    backgroundColor: Color.backgroundPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: moderateScale(60),
  },
  headerContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  titleViewStyle: {
    flex: 1,
  },
  txtTitle: {
    color: Color.white,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  txtSubTitle: {
    color: Color.white,
    fontSize: moderateScale(14),
  },
  logoContainer: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
  },
  logoText: {
    color: Color.white,
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
  },
  grid: { paddingHorizontal: moderateScale(10) },
  iconWithTitle: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(5),
    backgroundColor: Color.transparent_White,
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backView: {
    paddingHorizontal: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: Color.white,
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginLeft: moderateScale(6),
  },
});

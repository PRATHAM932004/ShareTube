import { Color } from '@theme';
import { moderateScale } from '@utils';
import { Platform, StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '95%',
    paddingTop: moderateScale(10),
    paddingStart: moderateScale(10),
    paddingEnd: moderateScale(10),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    alignItems: 'center',
    alignSelf: 'center',
  },
  subContainer: { alignItems: 'center', flexDirection: 'row' },
  successContainer: {
    backgroundColor: Color.bgSuccessToast,
    borderColor: Color.successToast,
  },
  warningContainer: {
    backgroundColor: Color.bgWarnToast,
    borderColor: Color.warnToast,
  },
  errorContainer: {
    backgroundColor: Color.bgErrorToast,
    borderColor: Color.errorToast,
  },
  text: {
    marginLeft: moderateScale(14),
    fontSize: moderateScale(16),
    flex: 1,
  },
  icon: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode: 'contain',
  },
  successText: {
    color: Color.successToast,
  },
  warningText: {
    color: Color.warnToast,
  },
  errorText: {
    color: Color.errorToast,
  },
  dashView: {
    height: moderateScale(2),
    borderRadius: moderateScale(1),
    width: moderateScale(50),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(6),
  },
  hideDashView: { height: moderateScale(10) },
});

import { Color } from '@theme';
import { moderateScale } from '@utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.black_60,
  },
  modalView: {
    backgroundColor: Color.white,
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(34),
    alignItems: 'center',
    elevation: 5,
  },
  btnContainer: {
    borderRadius: moderateScale(6),
    elevation: 5,
  },
  nagativeBtn: {
    paddingHorizontal: moderateScale(35),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(6),
    backgroundColor: Color.white,
  },
  positiveBtn: {
    paddingHorizontal: moderateScale(35),
    paddingVertical: moderateScale(10),
    backgroundColor: Color.backgroundPrimary,
    borderRadius: moderateScale(6),
  },
  nagativeBtnTextStyle: {
    color: Color.accent,
    fontSize: moderateScale(14),
  },
  positiveBtnTextStyle: {
    color: Color.white,
    fontSize: moderateScale(14),
  },
  modalText: {
    marginBottom: moderateScale(30),
    textAlign: 'center',
    fontSize: moderateScale(16),
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: moderateScale(24),
  },
});

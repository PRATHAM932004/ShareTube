import { Color } from '@theme';
import { moderateScale } from '@utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Color.backgroundPrimary,
    paddingVertical: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(48),
    color: Color.white,
  },
  subTitle: {
    fontSize: moderateScale(24),
    color: Color.white,
  },
  timeContainer: {
    gap: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeContainer2: {
    gap: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  time: {
    fontSize: moderateScale(100),
    color: Color.white,
  },
  timeHeadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeHeading: {
    fontSize: moderateScale(30),
    color: Color.white,
  },
  button: {
    backgroundColor: Color.white,
    borderRadius: moderateScale(35),
    width: moderateScale(200),
    height: moderateScale(70),
    marginTop: 30,
  },
  buttonText: {
    color: Color.textPrimary,
    fontSize: moderateScale(25),
  },
  shiftView: {
    flexDirection: 'column',
    gap: moderateScale(16),
    paddingBottom: moderateScale(16),
  },
  shiftText: {
    backgroundColor: Color.gray_200,
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: Color.cardBorder,
  },
  timeText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  shiftContainer: {
    flexDirection: 'row', // Arrange children in a row
    justifyContent: 'space-between', // Push left and right apart
    alignItems: 'center', // Vertically center items
  },
});

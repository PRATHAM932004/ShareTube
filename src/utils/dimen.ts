import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

//Set 8-inch Tablet Size in Landscape mode
const guidelineBaseWidth = 1280;
const guidelineBaseHeight = 800;

const screenScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (screenScale(size) - size) * factor;
export { screenScale, verticalScale, moderateScale, height, width };

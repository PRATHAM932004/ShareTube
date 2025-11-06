import { Color } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Color.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

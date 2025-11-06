import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import React from 'react';
import { Color, ColorKeyType } from '@theme';
import { styles } from './styles';
import { ActivityIndicator } from 'react-native-paper';

interface props {
  visible: boolean;
  cStyle?: StyleProp<ViewStyle>;
  color?: ColorKeyType;
  size?: number | 'small' | 'large';
}

const STLoader = ({ visible, cStyle, color = 'accent', size = 48 }: props) => {
  return visible ? (
    <TouchableOpacity activeOpacity={1} style={[styles.container, cStyle]}>
      <ActivityIndicator size={size} color={Color[color]} />
    </TouchableOpacity>
  ) : null;
};

export default STLoader;

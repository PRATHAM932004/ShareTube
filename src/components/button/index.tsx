import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Button, ButtonProps } from 'react-native-paper';
import { styles } from './styles';

export interface STButtonProps extends ButtonProps {
  visible?: boolean;
  cStyle?: StyleProp<ViewStyle>;
}

const STButton = ({ visible = true, children, ...rest }: STButtonProps) => {
  return visible ? (
    <TouchableOpacity activeOpacity={0.7}>
      <Button
        style={[styles.container, rest.cStyle]}
        mode="contained"
        {...rest}
      >
        {children}
      </Button>
    </TouchableOpacity>
  ) : null;
};

export default STButton;

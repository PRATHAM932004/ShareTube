import { View, StyleProp, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { icons, moderateScale } from '@utils';
import { STIconProps } from '@type/common';
import { styles } from './styles';
import { Color } from '@theme';
import { STIcon } from '@components';

export interface STTextInputProps<T> extends TextInputProps {
  id: Extract<keyof T, string>;
  visible?: boolean;
  cStyle?: StyleProp<ViewStyle>;
  className?: string;
  leftIcon?: STIconProps;
  rightIcon?: STIconProps;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  helperText?: string;
  passRightIcon?: boolean;
}

const STTextInput = <T,>({
  id,
  visible = true,
  mode = 'outlined',
  error = false,
  disabled,
  value,
  onChangeText,
  onBlur,
  passRightIcon = false,
  ...rest
}: STTextInputProps<T>) => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean | undefined>(
    passRightIcon === true ? true : rest.secureTextEntry
  );

  const getRightIocn = (): STIconProps | undefined => {
    return passRightIcon === true
      ? secureTextEntry == true
        ? icons.eye
        : icons.eyeOff
      : rest.rightIcon;
  };

  const [rightIcon, setRightIcon] = useState<STIconProps | undefined>(
    getRightIocn()
  );

  useEffect(() => {
    setRightIcon(getRightIocn());
  }, [secureTextEntry]);

  const getOutlineColor = () => {
    if (disabled) return Color.disableColor;
    if (error) return Color.inputError;
    return Color.textPrimary;
  };

  const getActiveOutlineColor = () => {
    if (error) return Color.inputError;
    return Color.textPrimary;
  };

  const onRightPress = () => {
    if (rest.onRightPress) rest.onRightPress();
    if (passRightIcon === true) {
      setSecureTextEntry(!secureTextEntry);
    }
  };

  return visible ? (
    <View style={[styles.container, rest.cStyle]}>
      <TextInput
        id={id}
        style={{
          height: moderateScale(60),
          backgroundColor: Color.backgroundPrimary,
        }}
        mode={mode}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        {...rest}
        placeholderTextColor={disabled ? Color.disableColor : Color.inputBorder}
        textColor={disabled ? Color.disableColor : Color.textPrimary}
        onFocus={(e) => {
          rest.onFocus?.(e);
        }}
        outlineColor={getOutlineColor()}
        activeOutlineColor={getActiveOutlineColor()}
        left={
          rest.leftIcon ? (
            <TextInput.Icon
              icon={() =>
                rest.leftIcon ? <STIcon {...rest.leftIcon} /> : null
              }
              onPress={rest.onLeftPress}
            />
          ) : null
        }
        right={
          rightIcon ? (
            <TextInput.Icon
              icon={() => (rightIcon ? <STIcon {...rightIcon} /> : null)}
              onPress={onRightPress}
            />
          ) : null
        }
      />
      {error && rest.helperText && (
        <HelperText
          numberOfLines={1}
          type={error == true ? 'error' : 'info'}
          visible
        >
          {rest.helperText}
        </HelperText>
      )}
    </View>
  ) : null;
};

export default STTextInput;

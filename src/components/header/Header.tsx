import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  Image,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { icons, moderateScale } from '@utils';
import { Color, Images, Strings } from '@theme';
import ActionMenuView from './ActionMenuView';
import { ActionMenu } from '@type/common';
import { useNavigation } from '@react-navigation/native';
import { STIcon } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  visible?: boolean;
  cStyle?: StyleProp<ViewStyle>;
  titleViewStyle?: StyleProp<ViewStyle>;
  title?: string;
  txtTitle?: StyleProp<TextStyle>;
  subTitle?: string;
  isBack?: boolean;
  onBack?: () => void;
  actuionMenus?: ActionMenu[];
  onMenuPress?: (item: ActionMenu) => void;
}

const Header = ({
  visible = true,
  cStyle,
  isBack = false,
  title,
  subTitle,
  actuionMenus,
  ...rest
}: HeaderProps) => {
  const navigate = useNavigation();
  const insets = useSafeAreaInsets();

  const onBack = () => {
    if (rest.onBack) {
      rest.onBack();
    } else {
      navigate.goBack();
    }
  };

  const backView = () => {
    return isBack ? (
      <TouchableOpacity
        onPress={onBack}
        style={styles.backView}
        activeOpacity={0.7}
      >
        <STIcon {...icons.back} color={Color.white} size={moderateScale(40)} />
      </TouchableOpacity>
    ) : null;
  };

  const onMenuPress = (item: ActionMenu) => {
    if (rest.onMenuPress) rest.onMenuPress(item);
  };

  return visible ? (
    <View style={styles.container}>
      <View style={[styles.subContainer, { paddingTop: insets.top }]}>
        <View
          style={[
            styles.headerContainer,
            { paddingStart: isBack ? 0 : moderateScale(16) },
          ]}
        >
          {backView()}
          <View style={[styles.titleViewStyle, rest.titleViewStyle]}>
            <Text style={[styles.txtTitle, rest.txtTitle]}>{title}</Text>
            {subTitle && <Text style={styles.txtSubTitle}>{subTitle}</Text>}
          </View>
        </View>
        {actuionMenus && actuionMenus.length > 0 && (
          <ActionMenuView
            actuionMenus={actuionMenus}
            onMenuPress={onMenuPress}
          />
        )}
      </View>
    </View>
  ) : null;
};

export default Header;

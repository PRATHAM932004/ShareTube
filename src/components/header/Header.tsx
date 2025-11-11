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
import { icons, moderateScale, width } from '@utils';
import { Color, Images } from '@theme';
import ActionMenuView from './ActionMenuView';
import { ActionMenu } from '@type/common';
import { useNavigation } from '@react-navigation/native';
import { STIcon, STTextInput } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  visible?: boolean;
  cStyle?: StyleProp<ViewStyle>;
  subContainerStyle?: StyleProp<ViewStyle>;
  titleViewStyle?: StyleProp<ViewStyle>;
  title?: string;
  txtTitle?: StyleProp<TextStyle>;
  subTitle?: string;
  isSearch?: boolean;
  isBack?: boolean;
  onBack?: () => void;
  actuionMenus?: ActionMenu[];
  isLogo?: boolean;
  onMenuPress?: (item: ActionMenu) => void;
  onSubmit?: (value: string) => void;
}

const Header = ({
  visible = true,
  cStyle,
  isBack = false,
  title,
  isLogo = false,
  isSearch = false,
  subTitle,
  actuionMenus,
  subContainerStyle,
  onSubmit = () => {},
  ...rest
}: HeaderProps) => {
  const navigate = useNavigation();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = React.useState('');

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

  const handleSearch = (data: string) => {
    onSubmit(data);
  };

  return visible ? (
    <View style={styles.container}>
      <View
        style={[
          styles.subContainer,
          { paddingTop: insets.top },
          subContainerStyle,
        ]}
      >
        <View
          style={[
            styles.headerContainer,
            { paddingStart: isBack ? 0 : moderateScale(16) },
          ]}
        >
          {backView()}
          {isLogo && (
            <View style={styles.logoContainer}>
              <Image
                style={{
                  width: moderateScale(48),
                  height: moderateScale(48),
                  borderRadius: moderateScale(24),
                }}
                resizeMode="contain"
                source={Images.igniteLogo}
              />
              <Text
                style={{
                  color: Color.textPrimary,
                  fontSize: moderateScale(28),
                }}
              >
                ShareTube
              </Text>
            </View>
          )}
          {isSearch && (
            <STTextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => {
                handleSearch(searchQuery);
              }}
              placeholder="Search"
              returnKeyType="search"
              id="search"
              cStyle={{ width: width - moderateScale(80) }}
            />
          )}
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

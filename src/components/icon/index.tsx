import { STIconCategoryType, STIconProps } from '@type/common';
import { memo, useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import { Color } from '@theme';
import { ColorValue } from 'react-native';
import { moderateScale } from '@utils';

const STIcon = (props: STIconProps) => {
  const [type, setType] = useState<STIconCategoryType | undefined>(undefined);
  const [color, setColor] = useState<ColorValue | number>(Color.black_333);
  const [size, setSize] = useState<number>(24);

  useEffect(() => {
    if (props.type) {
      setType(props.type);
    }
  }, [props.type]);

  useEffect(() => {
    if (props.color) {
      setColor(props.color);
    }
  }, [props.color]);

  useEffect(() => {
    if (props.size) {
      setSize(props.size);
    }
  }, [props.size]);

  const render = () => {
    switch (type) {
      case 'AntDesign':
        return (
          <AntDesign
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      case 'Entypo':
        return (
          <Entypo
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      case 'EvilIcons':
        return (
          <EvilIcons
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      case 'Feather':
        return (
          <Feather
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      case 'FontAwesome':
        return (
          <FontAwesome
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      case 'FontAwesome5':
      case 'FontAwesome5Brands':
        return (
          <FontAwesome5
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      case 'FontAwesome6':
      case 'FontAwesome6Brands':
        return (
          <FontAwesome6
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      case 'Fontisto':
        return (
          <Fontisto
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      case 'Foundation':
        return (
          <Foundation
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      case 'Ionicons':
        return (
          <Ionicons
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      case 'MaterialCommunityIcons':
        return (
          <MaterialCommunityIcons
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      case 'MaterialIcons':
        return (
          <MaterialIcons
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      case 'Octicons':
        return (
          <Octicons
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      case 'SimpleLineIcons':
        return (
          <SimpleLineIcons
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      case 'Zocial':
        return (
          <Zocial
            {...props}
            color={color}
            size={moderateScale(size)}
            onPress={props.onPress}
          />
        );
      default:
        return null;
    }
  };

  return render();
};

export default memo(STIcon);

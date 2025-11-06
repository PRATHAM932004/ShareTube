import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { STIcon } from '@components';
import { Color } from '@theme';
import Screen from '@screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabBarIcon from './tabBarIcon';
import { RootBottomParamList } from './navTypes';
import { moderateScale } from '@utils';

const BottomTab = createBottomTabNavigator<RootBottomParamList>();

const BottomNavigator = () => {
  const insets = useSafeAreaInsets();

  console.log(insets);
  return (
    <>
      <BottomTab.Navigator
        screenOptions={(screenOptions) => ({
          headerShown: false,
          tabBarActiveTintColor: Color.accent,
          tabBarStyle: {
            backgroundColor: Color.backgroundSecondary,
            height: moderateScale(60) + insets.bottom,
            display: 'flex',
          },
          tabBarIcon: (tabIconOption) => (
            <TabBarIcon {...tabIconOption} {...screenOptions} />
          ),
        })}
      >
        <BottomTab.Screen name="Home" component={Screen.Home} />
        <BottomTab.Screen name="Profile" component={Screen.Profile} />
      </BottomTab.Navigator>
    </>
  );
};

export default BottomNavigator;

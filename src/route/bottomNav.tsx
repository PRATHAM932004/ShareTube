import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Color } from '@theme';
import Screen from '@screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabBarIcon from './tabBarIcon';
import { RootBottomParamList } from './navTypes';
import { moderateScale } from '@utils';
import ProfileNavigator from './profileNav';

const BottomTab = createBottomTabNavigator<RootBottomParamList>();

const BottomNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <BottomTab.Navigator
        screenOptions={(screenOptions) => ({
          headerShown: false,
          tabBarActiveTintColor: Color.accent,
          tabBarStyle: {
            backgroundColor: Color.backgroundPrimary,
            height: moderateScale(60) + insets.bottom,
            display: 'flex',
          },
          tabBarIcon: (tabIconOption) => (
            <TabBarIcon {...tabIconOption} {...screenOptions} />
          ),
        })}
      >
        <BottomTab.Screen name="HOME" component={Screen.Home} />
        <BottomTab.Screen name="UPLOAD" component={Screen.UploadVideo} />
        <BottomTab.Screen name="PROFILE" component={ProfileNavigator} />
      </BottomTab.Navigator>
    </>
  );
};

export default BottomNavigator;

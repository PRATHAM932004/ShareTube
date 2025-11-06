import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navTypes';
import Screen from '@screen';
import BottomNavigator from './bottomNav';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SPLASH" component={Screen.Splash} />
    <Stack.Screen
      name="LOGIN"
      component={Screen.Login}
      options={{ animation: 'fade' }}
    />
    <Stack.Screen
      name="DASHBOARD"
      component={BottomNavigator}
      options={{ animation: 'fade' }}
    />
    <Stack.Screen
      name="PLAYVIDEO"
      component={Screen.PlayVideo}
      options={{ animation: 'fade' }}
    />
  </Stack.Navigator>
);

export default StackNavigator;
